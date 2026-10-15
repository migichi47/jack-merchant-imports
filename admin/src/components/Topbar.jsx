import React from "react";
import { GoDotFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Bell, Dot, Search } from "lucide-react";
import Button from "./Button";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center h-full justify-between px-5">
      <h1 className="text-gray-500 text-sm">Dashboard</h1>
      <div className="flex items-center gap-5">
        <div className="text-gray-500 border border-gray-300 px-4 rounded-lg py-2 flex items-center gap-2">
          <Search className="w-4" />
          <input
            type="text"
            placeholder="Search queries or imports"
            className="text-sm"
          />
        </div>
        <span className="relative">
          <Bell className="text-gray-500 w-5" />
          <GoDotFill className="text-red-500 text-xs absolute -top-1 -right-1" />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
