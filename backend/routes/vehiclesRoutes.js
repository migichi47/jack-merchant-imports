import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);

    res.status(500).json({
      message: "Could not retrieve vehicles from server",
    });
  }
});

export default router;
