import React from "react";
import { useCars } from "../hooks/useCars";
import PastImportCard from "./PastImportCard";
import { Loader } from "lucide-react";

const PastImportsSection = () => {
  const { pastImports } = useCars();

  // receiving _id, make, model, year, description, imageUrl, arrival
  return (
    <section className="scroll-mt-24 bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 space-y-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600"></p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Our Past Imports
          </h2>
          <p className="mt-4 leading-7 text-neutral-600">
            View a collection of our recent imports from Japan to different
            clients.
          </p>
        </div>

        {pastImports.length === 0 ? (
          <div className="min-h-[30vh] w-full flex items-center justify-center bg-gray-100">
            <div className="flex gap-2 text-xl w-fit h-fit items-center">
              loading <Loader className="animate-spin" />
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {pastImports?.map((item) => (
              <PastImportCard key={item._id} {...item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PastImportsSection;
