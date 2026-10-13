import express from "express";
import PopularCar from "../models/popularCar.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await PopularCar.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error("Failed to fetch popular cars:", error);

    res.status(500).json({
      message: "Failed to fetch popular cars",
    });
  }
});

export default router;
