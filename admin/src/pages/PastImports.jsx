import { Pencil, Search, Trash } from "lucide-react";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const PastImports = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Past Imports</h1>
        <span className="text-gray-500 text-sm">
          Showcase the vehicles that have been successfully sourced and imported
        </span>
      </div>

      <div className="flex items-center gap-2 border h-12 bg-white border-gray-200 grow px-2 rounded-lg">
        <Search className="w-4 text-gray-500" />
        <input
          type="text"
          placeholder="search make, model or year"
          className="grow outline-0"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-5">
        <PastImportCard />
        <PastImportCard />
        <PastImportCard />
        <PastImportCard />
        <PastImportCard />
      </div>
    </div>
  );
};

export default PastImports;

const PastImportCard = () => {
  return (
    <div className="w-full mx-auto space-y-2 border border-gray-300 rounded-lg">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJd83BmWyYxKaW37CUQXZSzg0lyrEj6x4vyYmHjqJXuuxQkpmiCSwhcWxB&s=10"
        alt=""
        className="rounded-t-lg object-cover max-h-60 w-full"
      />
      <div className="space-y-2 p-2">
        <h2 className="font-bold">Toyota Harrier</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-col text-gray-500 text-xs">
            <span>2021 manufacture</span>
            <span>Added 09 Oct 2026</span>
          </div>
          <span
            className="flex gap-5 sm:gap-2.5 items-center font-semibold text-xs text-red-600
            transition-all duration-300"
          >
            <Pencil className="w-4 hover:text-black cursor-pointer" />
            <Trash className="w-4 hover:text-black cursor-pointer" />
          </span>
        </div>
      </div>
    </div>
  );
};
