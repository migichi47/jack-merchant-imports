import { useContext } from "react";
import { CarContext } from "../context/CarContext";

export function useCars() {
  const context = useContext(CarContext);

  if (context === null) {
    throw new Error("useCars must be used within a CarProvider");
  }

  return context;
}
