import express from "express";
import Query from "../models/queries.js";

const router = express.Router();

router.get("/queries", async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching queries", error: err });
  }
});

router.post("/queries", async (req, res) => {
  try {
    const { fullName, contact, email, budget, car, description } = req.body;

    // Basic validation
    if (
      !fullName ||
      !contact ||
      !car?.make ||
      !car?.model ||
      car?.year?.from === undefined ||
      car?.year?.to === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required fields.",
      });
    }

    const newRequest = await Query.create({
      fullName,
      contact,
      email,
      budget,
      description,
      car: {
        make: car.make,
        model: car.model,
        year: {
          from: Number(car.year.from),
          to: Number(car.year.to),
        },
      },
    });

    return res.status(201).json({
      message: "Vehicle request submitted successfully.",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error saving vehicle request:", error);

    return res.status(500).json({
      message: "Failed to save vehicle request.",
    });
  }
});

export default router;
