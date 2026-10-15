import { ArrowRight } from "lucide-react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export const PastImportsGrid = () => {
  return (
    <div className="bg-white border border-gray-200 p-5 space-y-5 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-gray-800 font-bold">Past Imports</h1>
        <span
          className="text-red-600 flex items-center gap-1 text-xs font-semibold hover:scale-105
            transition-all cursor-pointer duration-300"
        >
          Manage Imports <ArrowRight className="w-4" />
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-5">
        <ImportCard />
        <ImportCard />
        <ImportCard />
      </div>
    </div>
  );
};

export const ImportCard = () => {
  return (
    <div className="max-w-80 mx-auto space-y-2">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJd83BmWyYxKaW37CUQXZSzg0lyrEj6x4vyYmHjqJXuuxQkpmiCSwhcWxB&s=10"
        alt=""
        className="rounded-t-lg"
      />
      <div className="space-y-2 px-2">
        <h2 className="font-bold">Toyota Harrier</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-gray-500 text-xs">
            <span>2021 manufacture</span>
            <span>Added 09 Oct 2026</span>
          </div>
          <span
            className="flex gap-1.5 items-center font-semibold text-xs text-red-600 hover:scale-105
          transition-all duration-300 cursor-pointer"
          >
            View <FaArrowRightLong className="text-sm" />
          </span>
        </div>
      </div>
    </div>
  );
};
