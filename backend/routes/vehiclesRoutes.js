import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  addVehivle,
  deleteVehicle,
  getAvailableMakes,
  getVehicleById,
  getVehicles,
} from "../controllers/vehiclesControllers.js";
import upload from "../middleware/upload.js";

const router = Router();
router.get("/", getVehicles);
router.get("/available-makes", getAvailableMakes);
router.post("/", requireAuth, upload.array("images", 10), addVehivle);
router.delete("/all", requireAuth, deleteVehicle);
router.get("/:id", getVehicleById);

export default router;
