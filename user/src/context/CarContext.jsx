import { useState } from "react";
import { CarContext } from "./CarContext";

export function CarProvider({ children }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleEnquire = (vehicle) => {
    setSelectedVehicle(vehicle);

    document.getElementById("request-quote")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <CarContext.Provider value={{ selectedVehicle, handleEnquire }}>
      {children}
    </CarContext.Provider>
  );
}
