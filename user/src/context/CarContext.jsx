import { useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../api";
import { useSearchParams } from "react-router-dom";

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const yearFrom = searchParams.get("yearFrom") || "";
  const yearTo = searchParams.get("yearTo") || "";

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/carapis/vehicles?source=sbtjapan&page_size=5", {
          params: {
            make,
            model,
            yearFrom,
            yearTo,
          },
        });

        setVehicles(response.data.results ?? response.data.vehicles ?? []);
      } catch (err) {
        console.error(err);
      }
    };

    
    fetchVehicles();
  }, [make, model, yearFrom, yearTo]);
  
  const value = {
    vehicles,
    setVehicles,
    loading,
    setLoading,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}
