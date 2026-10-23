import { useEffect, useState } from "react";
import { carMakes, carYears } from "../services/UtilityFunctions";
import VehicleCard from "./VehicleCard";
import api from "../api";

function VehicleSearch() {
  const [vehicles, setVehicles] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [fetching, setFetching] = useState(false);
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

    // fetchVehicles();
  }, []);

  const availableModels = make ? (carMakes[make] ?? []) : [];
  const availableYearsTo = carYears.filter((year) => year > Number(yearFrom));

  const handleMakeChange = (event) => {
    setMake(event.target.value);
    setModel("");
  };

  const handleSubmit = async () => {
    if (!make && !model) return;
    setFetching(true);
    try {
      const response = await api.get(
        `/api/carapis/vehicles?source=sbtjapan&page_size=20&make=${make}&model=${model}`,
      );
      await setVehicles(response?.data?.results);
    } catch (err) {
      throw new Error(err, { cause: err });
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-10 mt-20">
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
              {Object.keys(carMakes).map((carMake) => (
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
              onChange={(event) => setYearFrom(event.target.value)}
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
          disabled={!make || !model || fetching}
          className="rounded-lg bg-red-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer
          max-w-50 max-h-12 mx-auto"
        >
          {fetching ? "searching..." : "Search vehicles"}
        </button>
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">All Vehicles</h1>
          <p className="text-gray-600">
            Showing <span className="font-bold">1 - 20</span> vehicles
          </p>
        </div>

        <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles?.map((vehicle) => (
            <VehicleCard vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehicleSearch;
