import { Router } from "express";
import { getExchangeRate } from "../controllers/exchangeRateControllers.js";

const router = Router();

router.get("/", getExchangeRate);
export default router;
