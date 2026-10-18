import { Pencil, Search, Trash } from "lucide-react";
import React, { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { AdminContext } from "../context/AdminContext";
import { PastImportCard } from "../components/PastImportsGrid";
import SectionHeading from "../components/SectionHeading";

const PastImports = () => {
  const { pastImports } = useContext(AdminContext);

  return (
    <div className="space-y-5">
      <SectionHeading
        title="Past Imports"
        description="Showcase the vehicles that have been successfully sourced and imported"
      />

      <div className="flex items-center gap-2 border h-12 bg-white border-gray-200 grow px-2 rounded-lg">
        <Search className="w-4 text-gray-500" />
        <input
          type="text"
          placeholder="search make, model or year"
          className="grow outline-0"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-5">
        {pastImports.map((pastImport) => (
          <PastImportCard key={pastImport._id} {...pastImport} />
        ))}
      </div>
    </div>
  );
};

export default PastImports;
