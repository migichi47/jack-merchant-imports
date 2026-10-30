import { Router } from "express";
import Vehicle from "../models/Vehicle.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Get pagination values from query parameters
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filters = {};

    if (req.query.make) {
      filters.make = {
        $regex: req.query.make,
        $options: "i",
      };
    }
    if (req.query.model) {
      filters.model = {
        $regex: req.query.model,
        $options: "i",
      };
    }
    if (req.query.year) {
      filters.year = Number(req.query.year);
    }
    if (req.query.minYear || req.query.maxYear) {
      filters.year = {
        ...(req.query.minYear && {
          $gte: Number(req.query.minYear),
        }),
        ...(req.query.maxYear && {
          $lte: Number(req.query.maxYear),
        }),
      };
    }
    if (req.query.fuel_type) {
      filters.fuel_type = req.query.fuel_type;
    }
    if (req.query.transmission) {
      filters.transmission = req.query.transmission;
    }
    if (req.query.body_type) {
      filters.body_type = req.query.body_type;
    }
    if (req.query.source) {
      filters.source = req.query.source;
    }

    // Fetch filtered vehicles and total count
    const [vehicles, totalVehicles] = await Promise.all([
      Vehicle.find(filters)
        .sort({ source: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Vehicle.countDocuments(filters),
    ]);
    const totalPages = Math.ceil(totalVehicles / limit);

    res.status(200).json({
      success: true,
      vehicles,
      pagination: {
        currentPage: page,
        totalPages,
        totalVehicles,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    res.status(500).json({
      message: "Could not retrieve vehicles from server",
    });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.params.id) return;
  try {
    const foundVehicle = await Vehicle.findById(req.params.id);
    res.status(200).json(foundVehicle);
  } catch (err) {
    res.send(500).json({ msg: "Could not get vehicle", error: err });
  }
});

router.delete("/all", requireAuth, async (req, res) => {
  try {
    await Vehicle.deleteMany();
    res.status(200).json({ msg: "all vehicles deleted" });
  } catch (err) {
    res.send(500).json({ msg: "Could not delete vehicles", error: err });
  }
});

export default router;
