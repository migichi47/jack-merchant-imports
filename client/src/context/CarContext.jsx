import { useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../api";
import { useSearchParams } from "react-router-dom";

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const query = useSearchParams.toString();
        const response = await api.get(`/api/vehicles?${query}`);
        setVehicles(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    // getVehicles();
  }, []);

  const value = {
    vehicles,
    setVehicles,
    loading,
    setLoading,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}
