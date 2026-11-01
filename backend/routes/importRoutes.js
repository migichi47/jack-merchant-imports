import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import upload from "../middleware/upload.js";
import {
  addImport,
  deleteImport,
  getImports,
  getImportWithId,
  updateImport,
} from "../controllers/importControllers.js";

const router = Router();
router.post("/", requireAuth, upload.single("image"), addImport);
router.get("/", getImports);
router.get("/:id", getImportWithId);
router.delete("/:id", requireAuth, deleteImport);
router.patch("/:id", requireAuth, updateImport);

export default router;
