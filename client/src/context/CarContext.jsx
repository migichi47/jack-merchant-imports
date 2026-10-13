import { useEffect, useState } from "react";
import { CarContext } from "./CarContext";
import api from "../api";
import { useSearchParams } from "react-router-dom";

export function CarProvider({ children }) {
  const [vehicles, setVehicles] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const yearFrom = searchParams.get("yearFrom") || "";
  const yearTo = searchParams.get("yearTo") || "";


  useEffect(() => {
    const getPopularCars = async () => {
      try {
        const response = await api.get("/api/popular-cars");
        setPopular(response.data[0].results);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularCars();
  }, []);


  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/vehicles", {
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

    // fetchVehicles();
  }, [make, model, yearFrom, yearTo]);

  const value = {
    vehicles,
    popular,
    setVehicles,
    loading,
    setLoading,
  };

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}
