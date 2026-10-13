import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children, variant = "primary", className, onClick }) => {
  const variants = {
    primary: "bg-red-600 border border-gray-200 text-white",
    secondary: "bg-black",
  };

  const childrenVariants = {
    primary: "group-hover:text-white",
    secondary: "text-white",
  };

  const overlaySpanVariants = {
    secondary: "bg-gray-100/20",
  };
  return (
    <button
      className={twMerge(
        "relative group rounded-lg px-5 py-3 font-semibold text-sm cursor-pointer flex justify-center",
        variants[variant],
        className,
      )}
      onClick={onClick}
    >
      <span
        className={twMerge(
          "relative z-10 transition-colors duration-500 flex gap-2 items-center",
          childrenVariants[variant],
        )}
      >
        {children}
      </span>
      <span
        className={twMerge(
          "absolute bottom-0 left-0 h-0 w-full transition-all duration-500 ease-in-out group-hover:h-full rounded-full",
          overlaySpanVariants[variant],
        )}
      ></span>
    </button>
  );
};

export default Button;
