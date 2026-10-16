import { ArrowRight, Pencil, Trash } from "lucide-react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { Link } from "react-router-dom";

export const PastImportsGrid = () => {
  const { pastImports } = useContext(AdminContext);

  return (
    <div className="bg-white border border-gray-200 p-5 space-y-5 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-gray-800 font-bold">Past Imports</h1>
        <Link
          className="text-red-600 flex items-center gap-1 text-xs font-semibold hover:scale-105
            transition-all cursor-pointer duration-300"
          to={"/past-imports"}
        >
          Manage Imports <ArrowRight className="w-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-5">
        {pastImports.slice(0, 3).map((pastImport) => (
          <PastImportCard key={pastImport._id} {...pastImport} />
        ))}
      </div>
    </div>
  );
};

export const PastImportCard = ({ make, model, imageUrl, _id: id }) => {
  const { deleteImport } = useContext(AdminContext);

  
  return (
    <div className="w-full mx-auto space-y-2 border border-gray-300 rounded-lg hover:scale-98 transition-all duration-300">
      <img
        src={imageUrl}
        alt=""
        className="rounded-t-lg object-cover max-h-60 w-full"
      />
      <div className="space-y-2 p-2">
        <h2 className="font-bold">
          {make} {model}
        </h2>
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
            <Trash
              className="w-4 hover:text-black cursor-pointer"
              onClick={() => deleteImport(id)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};
