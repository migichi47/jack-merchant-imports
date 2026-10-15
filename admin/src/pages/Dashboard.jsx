import React from "react";
import Button from "../components/Button";
import {
  ArrowRight,
  CarFront,
  ChartNoAxesCombined,
  Clock,
  MessagesSquare,
} from "lucide-react";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  const dashboardCards = [
    {
      name: "New Queries",
      value: 12,
      icon: <MessagesSquare />,
    },
    {
      name: "Total Imports",
      value: 48,
      icon: <CarFront />,
    },
    {
      name: "Imported This Month",
      value: 6,
      icon: <ChartNoAxesCombined />,
    },
  ];

  const columns = [
    { key: "name", label: "Customer" },
    { key: "email", label: "Email" },
    { key: "vehicle", label: "Vehicle" },
    { key: "status", label: "Status" },
  ];

  const inquiries = [
    {
      id: 1,
      name: "John Kamau",
      email: "john@example.com",
      vehicle: "Toyota Harrier 2020",
      status: "Pending",
    },
    {
      id: 2,
      name: "Mary Wanjiku",
      email: "mary@example.com",
      vehicle: "Mazda CX-5 2021",
      status: "Contacted",
    },
  ];

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Welcome back, Admin</h1>
          <span className="uppercase text-gray-500 font-semibold text-sm">
            Overview
          </span>
        </div>
        <div>
          <Button>+ Add Import</Button>
        </div>
      </div>

      <div className="space-y-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dashboardCards.map((card, i) => (
            <div
              className="bg-white w-60 flex flex-col justify-between h-30 border border-gray-200 rounded-lg py-4 px-5"
              key={i}
            >
              <div className="w-full flex justify-between items-center">
                <h1 className="text-gray-500 text-sm font-semibold">
                  {card.name}
                </h1>
                <span className="">{card.icon}</span>
              </div>
              <span className="text-3xl font-bold">{card.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 p-5 space-y-5 rounded-xl">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-gray-800 font-bold">
              Recent Customer Queries
            </h1>
            <span
              className="text-red-600 flex items-center gap-1 text-xs font-semibold hover:scale-105
            transition-all cursor-pointer duration-300"
            >
              View all <ArrowRight className="w-4" />
            </span>
          </div>

          <div>
            <DataTable columns={columns} data={inquiries} />
          </div>
        </div>

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

          <div>
            <DataTable columns={columns} data={inquiries} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
