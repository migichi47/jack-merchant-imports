import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Logo = ({ variant = "primary", className }) => {
  const variants = {
    primary:
      "https://res.cloudinary.com/pzmxzqp0/image/upload/v1791925121/f1b934d6-71ab-40b5-8ced-c2ada86dcaea-remover-bg.png",
    secondary:
      "https://res.cloudinary.com/pzmxzqp0/image/upload/v1791925086/JM-imports-logo-remover-bg.png",
  };

  const textVariants = {
    primary: "",
    secondary: "text-white",
  };

  return (
    <Link
      className={twMerge(
        "flex gap-1 w-fit h-fit cursor-pointer sm:hover:scale-105 ease-in-out duration-300",
        className,
      )}
      to={"/"}
    >
      <img src={variants[variant]} alt="" className="w-20" />
      <h1 className="uppercase font-bold flex flex-col leading-4 justify-center">
        <span className={textVariants[variant]}>Jack Merchant</span>
        <span className="text-red-600">Imports</span>
      </h1>
    </Link>
  );
};

export default Logo;
