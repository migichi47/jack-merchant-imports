import { ReactNode, useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../services/api";
import type {
  AvailableMakes,
  PastImport,
  Pagination,
  Vehicle,
} from "../types/vehicle";

type CarProviderProps = {
  children: ReactNode;
};

export function CarProvider({ children }: CarProviderProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [sliderVehicles, setSliderVehicles] = useState<Vehicle[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [availableMakes, setAvailableMakes] = useState<AvailableMakes>({});
  const [pastImports, setPastImports] = useState<PastImport[]>([]);

  const fetchVehicles = async (filters = {}, page = 1) => {
    try {
      setFetching(true);

      const response = await api.get("/api/vehicles", {
        params: {
          ...filters,
          page,
          limit: 15,
        },
      });
      const data = response.data ?? {};
      const fetchedVehicles = data.vehicles ?? [];
      setVehicles(fetchedVehicles);
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
      const response = await api.get("/api/vehicles?page=2");
      const data = response.data ?? {};
      const fetchedVehicles = data.vehicles ?? [];
      setSliderVehicles(fetchedVehicles);
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  const fetchAvailableMakes = async () => {
    try {
      const response = await api.get("/api/vehicles/available-makes");
      setAvailableMakes(response.data.availableMakes ?? {});
    } catch (err) {
      console.error("Failed to fetch available makes:", err);
    }
  };

  const fetchPastImports = async () => {
    setFetching(true);
    try {
      const response = await api.get("/api/imports");
      setPastImports(response.data);
    } catch (err) {
      console.error("Error in fetching past imports:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSliderVehicles();
    fetchVehicles();
    fetchAvailableMakes();
    fetchPastImports();
  }, []);

  const handleEnquire = (vehicle: Vehicle) => {
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
        availableMakes,
        pastImports,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
