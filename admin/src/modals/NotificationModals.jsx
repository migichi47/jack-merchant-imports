import { useContext, useEffect, useState } from "react";
import {
  Bell,
  X,
  CarFront,
  Settings,
  CheckCircle,
  Check,
  Inbox,
  Circle,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AdminContext } from "../context/AdminContext";

const NotificationsModal = ({ isOpen, onClose, setShowNotifications }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const {
    fetchingNotifications,
    notifications,
    setNotifications,
    setUnreadCount,
    unreadCount,
    fetchNotifications,
  } = useContext(AdminContext);
  const navigate = useNavigate();

  // Mark one notification as read
  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, isRead: true } : item,
        ),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.patch("/api/notifications/read-all");
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, isRead: true })),
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/api/notifications/${id}`);
      fetchNotifications();
      setShowNotifications(true);
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      await api.delete("/api/notifications");
      fetchNotifications();
      setShowNotifications(true);
    } catch (err) {
      console.error("Failed to delete notifications", err);
    }
  };

  // Handle notification click
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }
    onClose();
    if (notification.link) {
      navigate(notification.link);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "unread") return !item.isRead;
    if (activeFilter === "read") return item.isRead;
    return true;
  });

  // Notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "new_query":
        return <CarFront size={19} />;

      case "new_import":
        return <CheckCircle size={19} />;

      default:
        return <Settings size={19} />;
    }
  };

  // Relative time
  const getTimeAgo = (date) => {
    // eslint-disable-next-line react-hooks/purity
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return new Date(date).toLocaleDateString();
  };

  // Close modal using Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[2px]">
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                <Bell size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900 text-lg">
                  Notifications
                </h2>

                <p className="text-xs text-gray-500 mt-0.5">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mt-6">
            <div className="space-y-3">
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                {["all", "unread", "read"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition ${
                      activeFilter === filter
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="text-xs pl-2 font-medium text-orange-600 hover:text-orange-700 disabled:text-gray-300
                disabled:cursor-not-allowed"
              >
                Mark all as read
              </button>
            </div>

            <button
              onClick={deleteAllNotifications}
              disabled={notifications.length === 0}
              className="text-xs font-medium bg-red-600 text-white py-1.5 px-3 rounded-full disabled:text-gray-300
              disabled:cursor-not-allowed cursor-pointer"
            >
              Delete all
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto">
          {fetchingNotifications ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-400">
              Loading notifications...
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-8">
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                <Inbox size={30} className="text-gray-400" />
              </div>

              <h3 className="font-medium text-gray-800">No notifications</h3>

              <p className="text-sm text-gray-400 mt-1">
                {activeFilter === "unread"
                  ? "You're all caught up!"
                  : "Your notifications will appear here."}
              </p>
            </div>
          ) : (
            <div>
              {filteredNotifications.map((notification) => (
                <button
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left px-5 py-5 border-b border-gray-100 flex gap-4 hover:bg-gray-50 transition ${
                    !notification.isRead ? "bg-orange-50/30" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
                      notification.type === "new_query"
                        ? "bg-blue-50 text-blue-600"
                        : notification.type === "new_import"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className={`text-sm ${
                          notification.isRead
                            ? "font-medium text-gray-700"
                            : "font-semibold text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h3>

                      {!notification.isRead && (
                        <Circle
                          size={8}
                          fill="currentColor"
                          className="text-orange-500 mt-1 shrink-0"
                        />
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      {notification.message}
                    </p>

                    <span className="text-xs text-gray-400 mt-2 block">
                      {getTimeAgo(notification.createdAt)}
                    </span>
                  </div>
                  <Trash
                    className="w-5 my-auto cursor-pointer"
                    onClick={() => deleteNotification(notification._id)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={fetchNotifications}
            className="w-full py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Check size={16} />
            Refresh notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
