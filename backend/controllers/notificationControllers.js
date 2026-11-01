import mongoose from "mongoose";
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    const unreadCount = await Notification.countDocuments({
      isRead: false,
    });
    res.status(200).json({
      notifications,
      unreadCount,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: err,
    });
  }
};

export const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { isRead: false },
      { $set: { isRead: true } },
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notifications",
    });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany();
    res.status(200).json({
      message: "all notifications deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "could not delete notifications",
    });
  }
};

export const markOneNotificationRead = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: "Invalid notification ID",
    });
  }
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
    });
  }
};

export const deleteOneNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Notification deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "could not delete notification",
    });
  }
};
