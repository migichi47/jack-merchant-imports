import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsControllers.js";

const router = express.Router();
router.get("/", requireAuth, getSettings);
router.patch("/", requireAuth, updateSettings);

export default router;
