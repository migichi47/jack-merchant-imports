import { Router } from "express";
import Admin from "../models/Admin.js";
import { requestLogin, verifyAuth } from "../controllers/loginControllers.js";

const router = Router();
router.post("/login", requestLogin);
router.get("/me", verifyAuth);

export default router;
