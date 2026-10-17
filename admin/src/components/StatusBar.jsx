import { GoDotFill } from "react-icons/go";
import React from "react";
import { twMerge } from "tailwind-merge";

const StatusBar = ({ variant = "primary" }) => {
  const variants = {
    primary: "bg-amber-100 text-amber-900",
    secondary: "",
  };
  return (
    <div
      className={twMerge(
        "flex gap-2 items-center text-sm font-semibold w-fit py-1 px-2 rounded-full",
        variants[variant],
      )}
    >
      <GoDotFill className="text-[9px]" /> <span>In Progress</span>
    </div>
  );
};

export default StatusBar;
