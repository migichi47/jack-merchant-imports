import { GoDotFill } from "react-icons/go";
import React from "react";
import { twMerge } from "tailwind-merge";

const StatusBar = ({ variant = "new", status }) => {
  const variants = {
    new: "bg-pink-100 text-pink-900",
    inprogress: "bg-amber-100 text-amber-900",
    replied: "bg-green-100 text-green-900",
  };

  const textVariants = {
    new: "New",
    inprogress: "In Progress",
    replied: "Replied",
  };

  return (
    <div
      className={twMerge(
        "flex gap-2 items-center text-xs font-semibold w-fit py-1 px-2 rounded-full",
        variants[status],
      )}
    >
      <GoDotFill className="text-[9px]" /> <span>{textVariants[status]}</span>
    </div>
  );
};

export default StatusBar;
