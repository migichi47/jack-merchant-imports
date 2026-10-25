import { useEffect, useState } from "react";
import VehicleCard from "./VehicleCard";
import api from "../services/api";
import { makes } from "../data/vehicleOptions";
import { carYears } from "../data/carYears";

function VehicleSearch() {
  const [vehicles, setVehicles] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fetching, setFetching] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [yearFrom, setYearFrom] = useState();
  const [yearTo, setYearTo] = useState();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setFetching(true);
        const response = await api.get(
          "/api/carapis/vehicles?source=sbtjapan&page_size=20",
        );

        setVehicles(response.data.results ?? response.data.vehicles ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchVehicles();
  }, []);

  const availableModels = make ? (makes[make] ?? []) : [];
  const availableYearsTo = carYears.filter((year) => year >= Number(yearFrom));

  const handleMakeChange = (event) => {
    setMake(event.target.value);
    setModel("");
  };

  const handleSubmit = async () => {
    const fallbackYearTo = Number(yearTo) || new Date().getFullYear();
    const fallbackYearFrom = Number(yearFrom) || 2000;

    if (!make && !model) return;
    setFetching(true);
    try {
      const response = await api.get(
        `/api/carapis/vehicles?source=sbtjapan&page_size=20&make=${make}&model=${model}`,
      );
      await setVehicles(
        yearFrom || yearTo
          ? response?.data?.results?.filter(
              (vehicle) =>
                Number(vehicle?.year) >= fallbackYearFrom &&
                Number(vehicle?.year) <= fallbackYearTo,
            )
          : response?.data?.results,
      );
    } catch (err) {
      throw new Error(err, { cause: err });
    } finally {
      setFetching(false);
      setFiltering(true);
    }
  };

  return (
    <div id="quick-search" className="max-w-7xl mx-auto space-y-10 px-10 mt-20">
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
              value={make}
              required
              onChange={handleMakeChange}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any make</option>
              {Object.keys(makes).map((carMake) => (
                <option key={carMake} value={carMake} className="text-black">
                  {carMake}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="">
            <span>MODEL</span>
            <select
              value={model}
              required
              onChange={(event) => setModel(event.target.value)}
              className="w-full rounded-lg border border-gray-500 focus:border-pink-500 p-3"
            >
              <option value="">Any model</option>
              {availableModels.map((carModel) => (
                <option key={carModel} value={carModel}>
                  {carModel}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="">
            <span>YEAR FROM</span>
            <select
              value={yearFrom}
              onChange={(event) => {
                const selectedYear = event.target.value;
                setYearFrom(selectedYear);
                if (
                  selectedYear &&
                  yearTo &&
                  Number(yearTo) < Number(selectedYear)
                ) {
                  setYearTo("");
                }
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
              value={yearTo}
              onChange={(event) => setYearTo(event.target.value)}
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
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">
            {filtering ? "Search Results" : "Top Viewed Vehicles"}
          </h1>
          <p className="text-gray-600">
            Showing <span className="font-bold">1 - 20</span> vehicles
          </p>
        </div>

        <div className="py-5">
          {vehicles?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {vehicles?.map((vehicle) => (
                <VehicleCard vehicle={vehicle} />
              ))}
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
