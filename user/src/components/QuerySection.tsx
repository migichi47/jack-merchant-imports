import { useState } from "react";
import VehicleCard from "./VehicleCard";
import { carYears } from "../data/carYears";
import { useCars } from "../hooks/useCars";
import PaginationButtons from "./PaginationButtons";

function VehicleSearch() {
  const [filtering, setFiltering] = useState(false);
  const [yearFrom, setYearFrom] = useState();
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    minYear: "",
    maxYear: "",
    fuel_type: "",
    transmission: "",
  });
  const { fetchVehicles, vehicles, fetching, availableMakes } =
    useCars();
  const availableYearsTo = carYears.filter((year) => year >= Number(yearFrom));

  const handleSubmit = async () => {
    try {
      fetchVehicles(filters, 1);
    } catch (err) {
      throw new Error(err, { cause: err });
    } finally {
      setFiltering(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div id="quick-search" className="max-w-7xl mx-auto space-y-20 px-10 mt-20">
      <div className="shadow-md flex flex-col pb-5">
        <div className="font-bold text-white bg-gray-950 p-2 text-xl">
          Quick Search
        </div>
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-300 mx-auto w-full [&>label]:w-full 
          [&>label]:[&>span]:text-gray-500 [&>label]:[&>span]:font-semibold [&>label]:[&>span]:text-xs p-5"
        >
          <label htmlFor="">
            <span>MAKE</span>
            <select
              name="make"
              value={filters.make}
              required
              onChange={(e) => {
                handleChange(e);
                setFilters((prev) => ({
                  ...prev,
                  model: "",
                }));
              }}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any make</option>
              {Object.keys(availableMakes).map((carMake) => (
                <option key={carMake} value={carMake} className="text-black">
                  {carMake}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>MODEL</span>
            <select
              name="model"
              value={filters.model}
              required
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any model</option>
              {(availableMakes[filters.make] || []).map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>YEAR FROM</span>
            <select
              name="minYear"
              value={filters.minYear}
              onChange={(e) => {
                handleChange(e);
                setYearFrom(e.target.value);
              }}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any</option>
              {carYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>YEAR TO</span>
            <select
              name="maxYear"
              value={filters.maxYear}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any</option>
              {availableYearsTo.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>FUEL TYPE</span>
            <select
              name="fuel_type"
              value={filters.fuel_type}
              required
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any</option>
              {["gasoline", "diesel", "hybrid", "electric"].map((carMake) => (
                <option key={carMake} value={carMake} className="text-black">
                  {carMake}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>TRANSMISIION</span>
            <select
              name="transmission"
              value={filters.transmission}
              required
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any</option>
              {["auto", "manual"].map((carMake) => (
                <option key={carMake} value={carMake} className="text-black">
                  {carMake}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={handleSubmit}
          disabled={fetching}
          className="rounded-lg bg-red-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer
          max-w-50 max-h-12 mx-auto"
        >
          {fetching ? "searching..." : "Search vehicles"}
        </button>
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[20px] sm:text-2xl">
            {filtering ? "Search Results" : "Top Viewed Vehicles"}
          </h1>
          <PaginationButtons className="hidden sm:flex" />
        </div>

        <div className="py-5">
          {vehicles?.length > 0 ? (
            <div className="space-y-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {vehicles?.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              <PaginationButtons />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8M9 11h.01M15 11h.01M3 13l2-6h14l2 6M5 13v5m14-5v5M3 13h18"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                No vehicles found
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                We couldn't find any vehicles to display. Try adjusting your
                search filters or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleSearch;
