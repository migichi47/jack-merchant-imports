import { useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../api";

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const response = await api.get("/api/vehicles");
        setVehicles(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    getVehicles();
  }, []);

  const value = {
    vehicles,
    setVehicles,
    loading,
    setLoading,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}
