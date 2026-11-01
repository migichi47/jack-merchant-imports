import express from "express";
import { fetchCarapisVehicles } from "../controllers/carapisControllers.js";

const router = express.Router();
router.get("/vehicles", fetchCarapisVehicles);

export default router;
