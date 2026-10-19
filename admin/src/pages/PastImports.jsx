import { Search } from "lucide-react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { PastImportCard } from "../components/PastImportsGrid";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/BreadCrumbs";

const PastImports = () => {
  const { pastImports } = useContext(AdminContext);

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Past Imports",
          },
        ]}
      />
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
    </>
  );
};

export default PastImports;
