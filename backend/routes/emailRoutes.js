import { Router } from "express";
import { getEmails } from "../controllers/emailControllers.js";

const router = Router();
router.get("/", getEmails);

export default router;
