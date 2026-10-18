
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import {
  CarFront,
  CirclePlus,
  LayoutDashboard,
  Mail,
  MessageCircleQuestionMark,
  Settings,
  X,
} from "lucide-react";

const Sidebar = ({ setShowSidebar }) => {
  const links = [
    {
      name: "Dashboard",
      to: "/",
      icon: <LayoutDashboard className="w-4" />,
    },
    {
      name: "Customer Queries",
      to: "/queries",
      icon: <MessageCircleQuestionMark className="w-4" />,
    },
    {
      name: "Past Imports",
      to: "/past-imports",
      icon: <CarFront className="w-4" />,
    },
    {
      name: "Add Import",
      to: "/past-imports/new",
      icon: <CirclePlus className="w-4" />,
    },
    {
      name: "Settings",
      to: "/settings",
      icon: <Settings className="w-4" />,
    },
    {
      name: "Past Emails",
      to: "/emails",
      icon: <Mail size={18} />,
    },
  ];

  return (
    <div className="h-full w-full px-4 py-5 space-y-5">
      <div>
        <X
          className="relative left-50 mb-1 cursor-pointer md:hidden"
          onClick={() => setShowSidebar(false)}
        />
        <Logo />
      </div>
      <div className="[&>a]:py-2 [&>a]:px-1 [&>a]:rounded-lg">
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 text-gray-500 font-semibold text-sm ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:bg-pink-100"
              }`
            }
            onClick={() => setShowSidebar(false)}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
