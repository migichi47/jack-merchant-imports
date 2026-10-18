import React, { useContext } from "react";
import { Search } from "lucide-react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";
import { AdminContext } from "../context/AdminContext";
import SectionHeading from "../components/SectionHeading";

const Queries = () => {
  const { queries } = useContext(AdminContext);

  return (
    <div className="space-y-5">
      <SectionHeading
        title="Customer Queries"
        description="Manage customer enquiries and keep track of every conversation"
      />

      <div className="bg-white border rounded-xl border-gray-300 p-5 space-y-5">
        <div className="flex items-center justify-between h-10 gap-5">
          <div className="flex items-center gap-2 border border-gray-200 h-full grow px-2 rounded-lg">
            <Search className="w-4 text-gray-500" />
            <input
              type="text"
              placeholder="search name, email, phone or vehicle"
              className="grow outline-0 text-sm"
            />
          </div>
          {/* filter */}
          <select className="outline-0 border border-gray-200 h-full px-2 rounded-lg">
            <option value="">All Statuses</option>
            <option value="">New</option>
            <option value="">Replied</option>
          </select>
        </div>

        <div>
          <DataTable data={queries} />
        </div>
      </div>
    </div>
  );
};

export default Queries;
