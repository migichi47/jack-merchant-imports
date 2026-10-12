import { MoveRight } from "lucide-react";
import Button from "./Button";

const Header = () => {
  return (
    <div className="bg-white fixed w-full shadow">
      <div className="text-black flex justify-around items-center max-w-300 mx-auto h-20">
        <div className="flex gap-1">
          <img src="./JM-imports-logo-remover-bg.png" alt="" className="w-20" />
          <h1 className="uppercase font-bold flex flex-col leading-4 justify-center">
            <span>Jack Merchant</span>
            <span className="text-red-600">Imports</span>
          </h1>
        </div>
        <div
          className="text-xs space-x-5 [&>a]:hover:text-pink-500 border border-gray-200 bg-gray-100 py-3 px-10 rounded-full
        font-semibold"
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

        <Button>
          <span>Import Now</span>
          <MoveRight className="w-3" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
