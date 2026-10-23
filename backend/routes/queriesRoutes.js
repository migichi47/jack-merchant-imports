import express from "express";
import Query from "../models/queries.js";
import EmailLog from "../models/emailLog.js";
import { sendClientEmail } from "../services/emailServices.js";
import { getGeneralSettings } from "../services/settingServices.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching queries", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fullName, contact, email, budget, car, description } = req.body;

    // Basic validation
    if (!fullName || !contact || !car?.make || !car?.model) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const newQuery = await Query.create({
      fullName,
      contact,
      email,
      budget,
      description,
      car: {
        make: car.make,
        model: car.model,
      },
    });

    const settings = await getGeneralSettings();

    if (newQuery.email && settings.emails.queryConfirmation) {
      const subject = "We received your vehicle import request";

      const message =
        `Hello ${newQuery.fullName},\n\n` +
        "Thank you for contacting Jack Merchants Imports. " +
        "We have received your vehicle import request and our team " +
        "will review the details and contact you.\n\n" +
        "This email confirms receipt of your request; it does not " +
        "mean your vehicle order has been confirmed.\n\n" +
        "Thank you,\nJack Merchants Imports";

      try {
        const result = await sendClientEmail({
          to: newQuery.email,
          subject,
          message,
        });

        await EmailLog.create({
          queryId: newQuery._id,
          to: newQuery.email,
          subject,
          message,
          type: "query_confirmation",
          status: "sent",
          providerId: result.id,
        });
      } catch (emailError) {
        console.error("Confirmation email failed:", emailError);

        try {
          await EmailLog.create({
            queryId: newQuery._id,
            to: newQuery.email,
            subject,
            message,
            type: "query_confirmation",
            status: "failed",
            error: emailError.message,
          });
        } catch (logError) {
          console.error("Could not save email failure:", logError);
        }
      }
    }

    return res.status(201).json({
      message: "Your vehicle import request was submitted successfully",
      query: newQuery,
    });
  } catch (error) {
    console.error("Error saving vehicle request:", error);

    return res.status(500).json({
      message: "Failed to save vehicle request.",
    });
  }
});

router.post("/:id/email", requireAuth, async (req, res) => {
  const { subject, message } = req.body;

  if (
    typeof subject !== "string" ||
    !subject.trim() ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return res.status(400).json({
      message: "Subject and message are required",
    });
  }

  if (subject.length > 200 || message.length > 10000) {
    return res.status(400).json({
      message: "Subject or message is too long",
    });
  }

  try {
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        message: "Client query not found",
      });
    }

    if (!query.email) {
      return res.status(400).json({
        message: "This client has no email address",
      });
    }

    try {
      const result = await sendClientEmail({
        to: query.email,
        subject: subject.trim(),
        message: message.trim(),
      });

      await EmailLog.create({
        queryId: query._id,
        to: query.email,
        subject: subject.trim(),
        message: message.trim(),
        type: "manual",
        status: "sent",
        providerId: result.id,
      });

      return res.status(200).json({
        message: "Email accepted by the email service",
        emailId: result.id,
      });
    } catch (emailError) {
      await EmailLog.create({
        queryId: query._id,
        to: query.email,
        subject: subject.trim(),
        message: message.trim(),
        type: "manual",
        status: "failed",
        error: emailError.message,
      });

      return res.status(502).json({
        message: "Unable to send email. Please try again.",
      });
    }
  } catch (error) {
    console.error("Manual email route error:", error);

    return res.status(500).json({
      message: "An unexpected error occurred",
    });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const foundQuery = await Query.findById(req.params.id);
    res.status(200).send(foundQuery);
  } catch (err) {
    res.status(500).json({ error: err, message: "Could not get query" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deletedQuery = await Query.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedQuery);
  } catch (err) {
    res.status(500).json({ error: err, message: "Could not delete query" });
  }
});

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const updatedQuery = await Query.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(updatedQuery);
  } catch (err) {
    res.status(500).json({ error: err, message: "Could not update query" });
  }
});

export default router;
