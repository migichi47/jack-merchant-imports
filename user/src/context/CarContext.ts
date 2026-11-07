import { createContext, Dispatch, SetStateAction } from "react";
import { AvailableMakes, Pagination, PastImport, Vehicle } from "../types/vehicle";

type VehicleFilters = Record<
  string,
  string | number | boolean | undefined
>;

type CarContextType = {
  selectedVehicle: Vehicle | null;
  handleEnquire: (vehicle: Vehicle) => void;
  vehicles: Vehicle[];
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>;
  fetching: boolean;
  setFetching: Dispatch<SetStateAction<boolean>>;
  fetchVehicles: (
    filters?: VehicleFilters,
    page?: number
  ) => Promise<void>;
  sliderVehicles: Vehicle[];
  pagination: Pagination | null;
  availableMakes: AvailableMakes;
  pastImports: PastImport[];
};


export const CarContext = createContext<CarContextType | null>(null);
