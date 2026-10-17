import { GoDotFill } from "react-icons/go";
import React from "react";
import { twMerge } from "tailwind-merge";

const StatusBar = ({ variant = "new" }) => {
  const variants = {
    new: "bg-green-100 text-green-900",
    inprogress: "bg-amber-100 text-amber-900",
    replied: "",
  };

  const textVariants = {
    new: "New",
    inprogress: "In Progress",
    replied: "Replied",
  };
  return (
    <div
      className={twMerge(
        "flex gap-2 items-center text-sm font-semibold w-fit py-1 px-2 rounded-full",
        variants[variant],
      )}
    >
      <GoDotFill className="text-[9px]" /> <span>{textVariants[variant]}</span>
    </div>
  );
};

export default StatusBar;
