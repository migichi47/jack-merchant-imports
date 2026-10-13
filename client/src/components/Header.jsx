import { Menu, MoveRight, X } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`bg-white fixed w-full shadow z-100 pt-3 ${showMenu ? "h-54 lg:h-20" : "h-20"} transition-all duration-600 ease-in-out`}
    >
      <div
        className={`text-black flex justify-between items-center max-w-300 mx-auto px-5`}
      >
        <Link className="flex gap-1 w-fit h-fit cursor-pointer sm:hover:scale-105 ease-in-out duration-300" to={"/"}>
          <img src="./JM-imports-logo-remover-bg.png" alt="" className="w-20" />
          <h1 className="uppercase font-bold flex flex-col leading-4 justify-center">
            <span>Jack Merchant</span>
            <span className="text-red-600">Imports</span>
          </h1>
        </Link>
        <span
          className="lg:hidden mr-5 hover:text-pink-500 cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <X /> : <Menu />}
        </span>
        <div
          className={`text-sm lg:text-xs space-x-5 [&>a]:hover:text-pink-500 lg:border border-gray-200 lg:bg-gray-100 lg:py-3 px-10
            rounded-full font-semibold lg:flex lg:static lg:w-fit inset-0 ${showMenu ? "flex absolute top-20 w-full fade-from-top" : "hidden"}
            h-fit flex flex-col items-center lg:flex-row [&>a]:mx-auto lg:gap-5 gap-3`}
        >
          <a
            href="#"
            className="lg:border-b-2 border-b-red-600 lg:text-red-600 font-semibold"
          >
            Home
          </a>
          <a href="#">How it works</a>
          <a href="#">About us</a>
          <a href="#">Contact</a>
        </div>

        <Button className="hidden lg:block bg-green-600 text-white">
          <FaWhatsapp className="text-lg" />
          Whatsapp
        </Button>
      </div>
    </div>
  );
};

export default Header;
