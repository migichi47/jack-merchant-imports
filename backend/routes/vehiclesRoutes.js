import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  deleteVehicle,
  getAvailableMakes,
  getVehicleById,
  getVehicles,
} from "../controllers/vehiclesControllers.js";

const router = Router();
router.get("/", getVehicles);
router.get("/available-makes", getAvailableMakes);
router.get("/:id", getVehicleById);
router.delete("/all", requireAuth, deleteVehicle);

export default router;
