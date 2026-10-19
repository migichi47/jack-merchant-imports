import express from "express";
import Settings from "../models/settings.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

const defaultSettings = {
  key: "general",
  emails: {
    queryConfirmation: true,
    statusUpdates: true,
    importCompletion: false,
    newQueryAlerts: true,
    failedEmailAlerts: true,
  },
  queries: {
    followUpReminders: false,
    followUpDays: 3,
    requireCancellationReason: true,
  },
  business: {
    name: "Jack Merchants Imports",
    contactEmail: "",
    phone: "",
    whatsapp: "",
    signature:
      "Thank you,\nJack Merchants Imports\nYour trusted vehicle import partner.",
  },
};

// GET /api/settings
router.get("/", requireAuth, async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: "general" });

    if (!settings) {
      settings = await Settings.create(defaultSettings);
    }

    res.status(200).json(settings);
  } catch (error) {
    console.error("Fetch settings error:", error.message);
    res.status(500).json({ message: "Failed to fetch settings." });
  }
});

// PATCH /api/settings
router.patch("/", requireAuth, async (req, res) => {
  try {
    const { emails, queries, business } = req.body;

    const allowedFields = {
      emails: [
        "queryConfirmation",
        "statusUpdates",
        "importCompletion",
        "newQueryAlerts",
        "failedEmailAlerts",
      ],
      queries: [
        "followUpReminders",
        "followUpDays",
        "requireCancellationReason",
      ],
      business: ["name", "contactEmail", "phone", "whatsapp", "signature"],
    };

    const updates = {};

    for (const section of ["emails", "queries", "business"]) {
      const submittedSection = req.body[section];

      if (
        submittedSection !== undefined &&
        (!submittedSection ||
          typeof submittedSection !== "object" ||
          Array.isArray(submittedSection))
      ) {
        return res.status(400).json({
          message: `The "${section}" setting must be an object.`,
        });
      }

      if (submittedSection) {
        for (const field of Object.keys(submittedSection)) {
          if (!allowedFields[section].includes(field)) {
            return res.status(400).json({
              message: `Invalid setting: ${section}.${field}`,
            });
          }

          updates[`${section}.${field}`] = submittedSection[field];
        }
      }
    }

    // Validate values before saving.
    for (const field of allowedFields.emails) {
      const value = updates[`emails.${field}`];

      if (value !== undefined && typeof value !== "boolean") {
        return res.status(400).json({
          message: `emails.${field} must be a boolean.`,
        });
      }
    }

    for (const field of ["followUpReminders", "requireCancellationReason"]) {
      const value = updates[`queries.${field}`];

      if (value !== undefined && typeof value !== "boolean") {
        return res.status(400).json({
          message: `queries.${field} must be a boolean.`,
        });
      }
    }

    const days = updates["queries.followUpDays"];

    if (
      days !== undefined &&
      (!Number.isInteger(days) || days < 1 || days > 365)
    ) {
      return res.status(400).json({
        message: "Follow-up days must be an integer between 1 and 365.",
      });
    }

    for (const field of allowedFields.business) {
      const value = updates[`business.${field}`];

      if (value !== undefined && typeof value !== "string") {
        return res.status(400).json({
          message: `business.${field} must be a string.`,
        });
      }

      if (typeof value === "string" && value.length > 2000) {
        return res.status(400).json({
          message: `business.${field} is too long.`,
        });
      }
    }

    if (updates["business.contactEmail"]) {
      const email = updates["business.contactEmail"];

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          message: "Please provide a valid business contact email.",
        });
      }
    }

    const settings = await Settings.findOneAndUpdate(
      { key: "general" },
      {
        $set: updates,
        $setOnInsert: { key: "general" },
      },
      {
        upsert: true,
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      message: "Settings saved successfully.",
      settings,
    });
  } catch (error) {
    console.error("Update settings error:", error.message);
    res.status(500).json({ message: "Failed to update settings." });
  }
});

export default router;
