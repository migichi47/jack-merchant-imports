import { Pencil, Search, Trash } from "lucide-react";
import React, { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AdminContext } from "../context/AdminContext";
import { PastImportCard } from "../components/PastImportsGrid";

const PastImports = () => {
  const { pastImports } = useContext(AdminContext);

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
        {pastImports.slice(0, 3).map((pastImport) => (
          <PastImportCard {...pastImport} />
        ))}
      </div>
    </div>
  );
};

export default PastImports;
