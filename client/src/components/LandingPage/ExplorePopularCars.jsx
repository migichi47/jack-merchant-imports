import React from "react";
import Car from "../Car";
import { useCars } from "../../hooks/useCars";

const ExplorePopularCars = () => {
  const { vehicles } = useCars();

  return (
    <div className="space-y-5 max-w-400 mx-auto px-5">
      <h1 className="flex space-y-2 text-3xl sm:text-4xl capitalize gap-2 mx-auto w-fit">
        Explore Popular <span className="font-bold">Cars</span>
      </h1>
      <p className="w-fit mx-auto text-center text-gray-500">
        Popular car reviews and releases. We'll help you buy with confidence.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-fit mx-auto space-y-10 sm:gap-5">
        {vehicles.map((vehicle) => {
          return <Car {...vehicle} key={vehicle.id} />;
        })}
      </div>
    </div>
  );
};

export default ExplorePopularCars;
