import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu } from "lucide-react";

const Topbar = ({ setShowSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center h-full justify-between px-5">
      <div className="flex items-center gap-1">
        <img
          src="https://res.cloudinary.com/pzmxzqp0/image/upload/v1791925121/f1b934d6-71ab-40b5-8ced-c2ada86dcaea-remover-bg.png"
          alt=""
          className="w-15 md:hidden"
          onClick={() => navigate("/")}
        />
        <h1 className="text-gray-500 text-sm">Dashboard</h1>
      </div>
      <div className="flex items-center gap-5">
        <Link className="relative" to={"/notifications"}>
          <Bell className="text-gray-500 w-5" />
          <GoDotFill className="text-red-500 text-xs absolute -top-1 -right-1" />
        </Link>
        <Menu
          className="md:hidden cursor-pointer"
          onClick={() => setShowSidebar((prev) => !prev)}
        />
      </div>
    </div>
  );
};

export default Topbar;
