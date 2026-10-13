import { Menu, MoveRight, X } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`bg-white fixed w-full shadow z-100 pt-3 ${showMenu ? "h-60 lg:h-20" : "h-20"} transition-all 
      duration-600 ease-in-out`}
    >
      <div
        className={`text-black flex justify-between items-center max-w-300 mx-auto px-5`}
      >
        <Logo />
        <div className="flex gap-5 items-center">
          <span
            className="lg:hidden hover:text-pink-500 cursor-pointer"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {showMenu ? <X /> : <Menu />}
          </span>
          <div
            className={`text-sm lg:text-xs space-x-5 [&>a]:hover:text-pink-500 lg:border border-gray-200 lg:bg-gray-100 lg:py-3
            px-10 rounded-full font-semibold lg:flex lg:static lg:w-fit inset-0 h-fit flex flex-col items-center lg:flex-row [&>a]:mx-auto 
            lg:gap-5 gap-3 ${showMenu ? "flex absolute top-20 w-full fade-from-top" : "hidden"}`}
          >
            <a
              href="/"
              className="lg:border-b-2 border-b-red-600 lg:text-red-600 font-semibold"
            >
              Home
            </a>
            <a href="/services">Our Services</a>
            <a href="#">How it works</a>
            <a href="#">About us</a>
            <a href="#">Contact</a>
          </div>

          <Button className="bg-green-600 text-white px-3">
            <FaWhatsapp className="text-lg" />
            <span className="hidden lg:block">Whatsapp</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
