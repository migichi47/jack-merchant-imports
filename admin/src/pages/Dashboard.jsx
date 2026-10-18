import React, { useContext } from "react";
import Button from "../components/Button";
import {
  ArrowRight,
  CarFront,
  ChartNoAxesCombined,
  MessagesSquare,
} from "lucide-react";
import DataTable from "../components/DataTable";
import { PastImportsGrid } from "../components/PastImportsGrid";
import { AdminContext } from "../context/AdminContext";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import SectionHeading from "../components/SectionHeading";

const Dashboard = () => {
  const { pastImports, dashboardQueries, queries, loadingDashboard } =
    useContext(AdminContext);
  const navigate = useNavigate();

  const dashboardCards = [
    {
      name: "Total Queries",
      value: queries?.length,
      icon: <MessagesSquare />,
      to: "/queries",
    },
    {
      name: "Total Imports",
      value: pastImports?.length ?? 0,
      icon: <CarFront />,
      to: "/past-imports",
    },
    {
      name: "Imported This Month",
      value: 6,
      icon: <ChartNoAxesCombined />,
      to: "/past-imports",
    },
  ];

  if (loadingDashboard) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner size={36} className="text-red-600" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <SectionHeading title="Welcome back, Admin" description=" Overview" />
        <div>
          <Button onClick={() => navigate("/past-imports/new")}>
            + Add Import
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dashboardCards.map((card, i) => (
            <Link
              className="bg-white w-full max-w-100 flex flex-col justify-between h-30 border border-gray-200
              rounded-lg py-4 px-5 mx-auto hover:scale-98 transition-all duration-300 cursor-pointer"
              key={i}
              to={card.to}
            >
              <div className="w-full flex justify-between items-center">
                <h1 className="text-gray-500 text-sm font-semibold">
                  {card.name}
                </h1>
                <span className="">{card.icon}</span>
              </div>
              <span className="text-3xl font-bold">{card.value}</span>
            </Link>
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
