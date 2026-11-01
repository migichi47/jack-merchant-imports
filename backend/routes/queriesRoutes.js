import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  addQuery,
  deleteAllQueries,
  deleteOneQuery,
  getQueries,
  getQueryById,
  sendManualEmail,
  updateQueryStatus,
} from "../controllers/queriesControllers.js";

const router = express.Router();

router.post("/", addQuery);
router.get("/", requireAuth, getQueries);
router.post("/:id/email", requireAuth, sendManualEmail);
router.delete("/all", requireAuth, deleteAllQueries);
router.get("/:id", requireAuth, getQueryById);
router.delete("/:id", requireAuth, deleteOneQuery);
router.patch("/:id", requireAuth, updateQueryStatus);

export default router;
