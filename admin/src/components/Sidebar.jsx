import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import {
  CarFront,
  CirclePlus,
  LayoutDashboard,
  MessageCircleQuestionMark,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full w-full px-4 py-5 space-y-5">
      <Logo />
      <div className="[&>a]:py-2 [&>a]:px-1 [&>a]:rounded-lg [&>a]:hover:bg-pink-100">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
        >
          <LayoutDashboard className="w-4" />
          Dashboard
        </Link>
        <Link
          to={"/queries"}
          className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
        >
          <MessageCircleQuestionMark className="w-4" />
          Customer Queries
        </Link>
        <Link
          to={"/past-imports"}
          className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
        >
          <CarFront className="w-4" />
          Past Imports
        </Link>
        <Link
          to={"/past-imports/new"}
          className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
        >
          <CirclePlus className="w-4" />
          Add Import
        </Link>
        <Link
          to={"/settings"}
          className="flex items-center gap-2 text-gray-500 font-semibold text-sm"
        >
          <Settings className="w-4" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
