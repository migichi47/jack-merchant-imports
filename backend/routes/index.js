import { Router } from "express";
import authRoutes from "./loginRoutes.js";
import queriesRoutes from "./queriesRoutes.js";
import importRoutes from "./importRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import emailRoutes from "./emailRoutes.js";
import carapisRoutes from "./carapisRoutes.js";
import vehiclesRoutes from "./vehiclesRoutes.js";
import notificationRoutes from "./notificationRoutes.js";
import exchangeRateRoutes from "./exchangeRateRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/queries", queriesRoutes);
router.use("/vehicles", vehiclesRoutes);
router.use("/imports", importRoutes);
router.use("/settings", settingsRoutes);
// router.use("/emails", emailRoutes);
router.use("/carapis", carapisRoutes);
router.use("/notifications", notificationRoutes);
router.use("/rates", exchangeRateRoutes);

export default router;
