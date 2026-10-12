import { Menu, MoveRight } from "lucide-react";
import Button from "./Button";

const Header = () => {
  return (
    <div className="bg-white fixed w-full shadow z-100">
      <div className="text-black flex justify-between items-center max-w-300 mx-auto h-20 px-5">
        <div className="flex gap-1 w-fit h-fit cursor-pointer sm:hover:scale-105 ease-in-out duration-300">
          <img src="./JM-imports-logo-remover-bg.png" alt="" className="w-20" />
          <h1 className="uppercase font-bold flex flex-col leading-4 justify-center">
            <span>Jack Merchant</span>
            <span className="text-red-600">Imports</span>
          </h1>
        </div>
        <Menu className="lg:hidden mr-5 hover:text-pink-500 cursor-pointer" />
        <div
          className="text-xs space-x-5 [&>a]:hover:text-pink-500 border border-gray-200 bg-gray-100 py-3 px-10 rounded-full
        font-semibold hidden lg:flex"
        >
          <a
            href="#"
            className="border-b-2 border-b-red-600 text-red-600 font-semibold"
          >
            Home
          </a>
          <a href="#">Available cars</a>
          <a href="#">How it works</a>
          <a href="#">About us</a>
          <a href="#">Contact</a>
        </div>

        <Button className="hidden lg:block">
          <span>Import Now</span>
          <MoveRight className="w-3" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
