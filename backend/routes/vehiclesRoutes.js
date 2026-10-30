import { Router } from "express";
import Vehicle from "../models/Vehicle.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
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
