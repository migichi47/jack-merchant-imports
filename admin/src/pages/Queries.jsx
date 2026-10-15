import React from "react";
import { Search } from "lucide-react";
import Button from "../components/Button";
import DataTable from "../components/DataTable";

const Queries = () => {
  const queries = [
    {
      name: "Grace Wanjiku",
      email: "grace.wanjiku@gmail.com",
      phone: "0712456789",
      vehicle: "Mazda CX-5 2022",
      received: "13 Oct 2026",
      status: "replied",
    },
    {
      name: "Kevin Otieno",
      email: "kevin.otieno@gmail.com",
      phone: "0798765432",
      vehicle: "Toyota Prado 2020",
      received: "12 Oct 2026",
      status: "new",
    },
    {
      name: "Faith Njeri",
      email: "faith.njeri@gmail.com",
      phone: "0705123456",
      vehicle: "Honda Vezel 2023",
      received: "11 Oct 2026",
      status: "new",
    },
    {
      name: "Joy Stacy",
      email: "joytwinkle@gmail.com",
      phone: "0112354768",
      vehicle: "Subaru Impreza XV 2007",
      received: "13 Oct 2026",
      status: "replied",
    },
  ];

  const columns = [
    { key: "name", label: "Customer" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "vehicle", label: "Vehicle" },
    { key: "received", label: "Receiveds" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="space-y-2">
      <div>
        <h1 className="text-2xl font-bold">Customer Queries</h1>
        <span className="text-gray-500 font-semibold text-sm">
          Manage customer enquiries and keep track of every conversation
        </span>
      </div>

      <div className="bg-white border rounded-xl border-gray-300 p-5 space-y-5">
        <div className="flex items-center justify-between h-10 gap-5">
          <div className="flex items-center gap-2 border border-gray-200 h-full grow px-2 rounded-lg">
            <Search className="w-4 text-gray-500" />
            <input
              type="text"
              placeholder="search name, email, phone or vehicle"
              className="grow"
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
          <DataTable columns={columns} data={queries} />
        </div>
      </div>
    </div>
  );
};

export default Queries;
