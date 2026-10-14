import {
  ClipboardList,
  ListTodo,
  MessagesSquare,
  MoveUpRight,
  Search,
  Ship,
} from "lucide-react";
import React from "react";
import Button from "../components/Button";

const OurServicesData = [
  {
    title: "Vehicle Sourcing",
    icon: <Search />,
    paragraph:
      "Help identifying vehicles that match your preferences, intended use and budget.",
  },
  {
    title: "Vehicle Importation",
    icon: <Ship />,
    paragraph:
      "Assistance coordinating the process of bringing your selected vehicle into Kenya",
  },
  {
    title: "Importance Guidance",
    icon: <ClipboardList />,
    paragraph:
      "Guidance on the steps, documentation, costs and requirements involved in your import",
  },
  {
    title: "Personalized Import Quotes",
    icon: <ListTodo />,
    paragraph:
      "Estimated costs based on your preferred vehicle budget and specific requirements.",
  },
  {
    title: "Customer Assistance",
    icon: <MessagesSquare />,
    paragraph:
      "Communication and guidance throughout the agreed sourcing and importation process",
  },
];

const OurServicesPage = () => {
  return (
    <div className="px-5 space-y-5 max-w-300 mx-auto mt-10">
      <h1 className="text-2xl font-bold">Vehicle Importation Made Simpler</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {OurServicesData.map((service, i) => {
          const { icon, title, paragraph } = service;

          return (
            <div
              key={i}
              className="bg-gray-100 p-5 rounded-lg flex flex-col gap-3 hover:scale-98 transition-all duration-300
              py-8"
            >
              <span className="text-red-600">{icon}</span>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="text-gray-500">{paragraph}</p>
            </div>
          );
        })}

        <div className="flex justify-end items-end p-5">
          <Button className={"capitalize text-black w-fit mx-auto h-fit"}>
            <span className="text-sm sm:text-xs">Request an import quote</span>
            <MoveUpRight className="w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurServicesPage;
