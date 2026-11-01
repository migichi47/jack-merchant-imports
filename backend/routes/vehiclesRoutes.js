import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  addVehivle,
  deleteVehicleByID,
  deleteVehicles,
  getAllVehicles,
  getAvailableMakes,
  getVehicleById,
  getVehicles,
} from "../controllers/vehiclesControllers.js";
import upload from "../middleware/upload.js";

const router = Router();
router.get("/", getVehicles);
router.get("/all", getAllVehicles);
router.get("/available-makes", getAvailableMakes);
router.post("/", requireAuth, upload.array("images", 10), addVehivle);
router.delete("/all", requireAuth, deleteVehicles);
router.get("/:id", getVehicleById);
router.delete("/:id", deleteVehicleByID);

export default router;
