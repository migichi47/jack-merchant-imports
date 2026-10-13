import express, { Router } from "express";
import { addImagesToVehicles } from "../services/vehicleService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const {
      make = "toyota",
      model,
      yearFrom,
      yearTo,
      limit=10,
      offset = 0,
    } = req.query;
    const params = new URLSearchParams();

    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);

    params.set("limit", limit);
    params.set("offset", offset);

    const response = await fetch(
      `https://api.carvector.io/v1/vehicles?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CARVECTOR_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch vehicles from CarVector",
      });
    }

    const data = await response.json();
    const vehiclesWithImages = await addImagesToVehicles(data.results);
    res.json({
      ...data,
      results: vehiclesWithImages,
    });
  } catch (error) {
    console.error("CarVector error:", error.message);

    res.status(500).json({
      message: "An error occurred while fetching vehicles",
    });
  }
});

export default router;
