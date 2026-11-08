import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import NotificationsModal from "../modals/NotificationModals";
import { useAdminContext } from "../context/AdminContext";

const Topbar = ({
  setShowSidebar,
}: {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { unreadCount } = useAdminContext();
  return (
    <div className="flex items-center h-full justify-between px-5 sm:pr-20">
      <div className="flex items-center gap-7">
        <Menu
          className="md:hidden cursor-pointer"
          onClick={() => setShowSidebar((prev) => !prev)}
        />
        <div className="flex items-center gap-1">
          <img
            src="https://res.cloudinary.com/pzmxzqp0/image/upload/v1791925121/f1b934d6-71ab-40b5-8ced-c2ada86dcaea-remover-bg.png"
            alt=""
            className="w-15 md:hidden"
            onClick={() => navigate("/")}
          />
          <h1 className="text-gray-500 text-sm">Dashboard</h1>
        </div>
      </div>
      <>
        <div
          className="relative cursor-pointer"
          onClick={() => setShowNotifications(true)}
        >
          <Bell className="text-gray-500 w-5" />
          {unreadCount > 0 && (
            <GoDotFill className="text-red-500 text-xs absolute -top-1 -right-1" />
          )}
        </div>
        <NotificationsModal
          isOpen={showNotifications}
          setShowNotifications={setShowNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </>
    </div>
  );
};

export default Topbar;
