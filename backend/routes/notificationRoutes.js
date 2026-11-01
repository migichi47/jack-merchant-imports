import { Router } from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  deleteAllNotifications,
  deleteOneNotification,
  getNotifications,
  markAllNotificationsRead,
  markOneNotificationRead,
} from "../controllers/notificationControllers.js";

const router = Router();
router.get("/", requireAuth, getNotifications);
router.patch("/read-all", requireAuth, markAllNotificationsRead);
router.delete("/", requireAuth, deleteAllNotifications);
router.patch("/:id/read", requireAuth, markOneNotificationRead);
router.delete("/:id", requireAuth, deleteOneNotification);

export default router;
