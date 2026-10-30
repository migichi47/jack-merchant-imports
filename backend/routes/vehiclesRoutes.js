import { Router } from "express";
import Vehicle from "../models/Vehicle.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Get pagination values from query parameters
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch vehicles and count total documents
    const [vehicles, totalVehicles] = await Promise.all([
      Vehicle.find().sort({ source: 1, createdAt: -1 }).skip(skip).limit(limit),
      Vehicle.countDocuments(),
    ]);

    // Calculate total pages
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
