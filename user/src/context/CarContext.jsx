import { useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../services/api";

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [sliderVehicles, setSliderVehicles] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setFetching(true);
        const response = await api.get("/api/vehicles");
        const fetchedData = response.data ?? [];

        await setVehicles(fetchedData ?? []);
        await setSliderVehicles(fetchedData ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleEnquire = (vehicle) => {
    setSelectedVehicle(vehicle);

    document.getElementById("request-quote")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <CarContext.Provider
      value={{
        selectedVehicle,
        handleEnquire,
        vehicles,
        setVehicles,
        fetching,
        setFetching,
        sliderVehicles,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
