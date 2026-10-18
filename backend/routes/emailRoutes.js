import { Router } from "express";
import emailLog from "../models/emailLog.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const emails = await emailLog.find().sort({ createdAt: -1 }).lean();

    res.json({ emails });
  } catch (error) {
    console.error("Failed to fetch emails:", error);

    res.status(500).json({
      message: "Could not retrieve email history",
    });
  }
});

export default router;
