import React, { useContext } from "react";
import Button from "../components/Button";
import {
  ArrowRight,
  CarFront,
  ChartNoAxesCombined,
  Clock,
  Dot,
  MessagesSquare,
} from "lucide-react";
import DataTable from "../components/DataTable";
import { FaArrowRightLong } from "react-icons/fa6";
import { PastImportsGrid } from "../components/PastImportsGrid";
import { AdminContext } from "../context/AdminContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { pastImports, dashboardQueries, queries } = useContext(AdminContext);

  const dashboardCards = [
    {
      name: "Total Queries",
      value: queries?.length,
      icon: <MessagesSquare />,
    },
    {
      name: "Total Imports",
      value: pastImports?.length ?? 0,
      icon: <CarFront />,
    },
    {
      name: "Imported This Month",
      value: 6,
      icon: <ChartNoAxesCombined />,
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
              className="bg-white w-full max-w-100 flex flex-col justify-between h-30 border border-gray-200
              rounded-lg py-4 px-5 mx-auto hover:scale-98 transition-all duration-300 cursor-pointer"
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
            <Link
              className="text-red-600 flex items-center gap-1 text-xs font-semibold hover:scale-105
            transition-all cursor-pointer duration-300"
              to={"/queries"}
            >
              View all <ArrowRight className="w-4" />
            </Link>
          </div>

          <div>
            <DataTable data={dashboardQueries} />
          </div>
        </div>

        <PastImportsGrid />
      </div>
    </div>
  );
};

export default Dashboard;
