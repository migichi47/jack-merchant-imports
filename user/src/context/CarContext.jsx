import { useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../services/api";

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [sliderVehicles, setSliderVehicles] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [pagination, setPagination] = useState({});

  const fetchVehicles = async (filters = {}, page = 1) => {
    try {
      setFetching(true);

      // Remove empty filter values
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) =>
            value !== "" && value !== null && value !== undefined,
        ),
      );

      const response = await api.get("/api/vehicles", {
        params: {
          ...activeFilters,
          page,
          limit: 20,
        },
      });
      const data = response.data ?? {};
      const fetchedVehicles = data.vehicles ?? [];
      await setVehicles(fetchedVehicles ?? []);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };
  const fetchSliderVehicles = async () => {
    try {
      setFetching(true);
      const response = await api.get("/api/vehicles");
      const data = response.data ?? {};
      const fetchedVehicles = data.vehicles ?? [];
      await setSliderVehicles(fetchedVehicles ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSliderVehicles();
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
        fetchVehicles,
        sliderVehicles,
        pagination,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
