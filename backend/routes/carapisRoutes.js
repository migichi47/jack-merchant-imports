
import express from "express";
import { getCarapisVehicles } from "../services/carapisService.js";

const router = express.Router();

router.get("/vehicles", async (req, res) => {
  try {
    const {
      source = "encar",
      brand,
      model,
      min_year,
      max_year,
      min_price,
      max_price,
      fuel_type,
      transmission,
      body_type,
      country,
      page = "1",
      page_size = "12",
    } = req.query;

    const numericFields = {
      page: Number(page),
      page_size: Number(page_size),
    };

    for (const [field, value] of Object.entries(numericFields)) {
      if (!Number.isInteger(value) || value < 1) {
        return res.status(400).json({
          message: `${field} must be a positive integer`,
        });
      }
    }

    if (numericFields.page_size > 50) {
      return res.status(400).json({
        message: "page_size cannot exceed 50",
      });
    }

    const filters = {
      source,
      brand,
      model,
      min_year,
      max_year,
      min_price,
      max_price,
      fuel_type,
      transmission,
      body_type,
      country,
      page: numericFields.page,
      page_size: numericFields.page_size,
    };

    const data = await getCarapisVehicles(filters);

    res.status(200).json(data);
  } catch (error) {
    console.error("Vehicle search failed:", error.message);

    res.status(502).json({
      message: "Unable to retrieve vehicles at the moment",
    });
  }
});

export default router;
