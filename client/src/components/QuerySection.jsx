import React, { useState } from "react";
import { makes, years } from "../data/vehicleOptions";
import Button from "./Button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Car from "./Car";
import { useCars } from "../hooks/useCars";

const QuerySection = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentMake = makes.find((m) => m.name === make);
  const availableModels = currentMake?.models ?? [];

  const {vehicles} = useCars()

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      make,
      model,
      yearFrom,
      yearTo,
    });
  };

  return (
    <>
      <div className="bg-gray-100 py-10">
        <div className="max-w-200 mx-auto flex flex-col items-center space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold">
              What are you looking for?
            </h2>
            <h3 className="text-gray-500 underline">Search Cars</h3>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex gap-5">
              <select
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel("");
                }}
                className="border border-gray-500 rounded-md p-2 outline-0"
              >
                <option value="" className="text-gray-400">
                  Select make
                </option>
                {makes.map((make) => (
                  <option key={make.name} value={make.name}>
                    {make.name}
                  </option>
                ))}
              </select>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                className="border border-gray-500 rounded-md p-2"
              >
                <option value="" className="text-gray-400">
                  Select model
                </option>
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="flex gap-4 items-center [&>select]:border [&>select]:border-gray-500 [&>select]:rounded-md
          [&>select]:px-2 [&>select]:py-1 [&>select]:outline-0 [&>select]:w-25"
            >
              <select
                name=""
                id=""
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
              >
                <option value="" className="text-gray-400">
                  from
                </option>
                {years.map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              <span>-</span>
              <select
                name=""
                id=""
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
              >
                <option value="" className="text-gray-400">
                  to
                </option>
                {years.map((year) => {
                  return (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-40"
            onClick={(e) => {
              handleSearch(e);
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {vehicles.length && (
        <div className="space-y-5 w-fit max-w-400 mx-auto px-5 mt-10">
          <h1 className="flex space-y-2 text-3xl sm:text-4xl capitalize gap-2 mx-auto w-fit">
            Search <span className="font-bold">Results</span>
          </h1>
          <p className="w-fit mx-auto text-center text-gray-500">
            Cars that seem to match your query
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 mx-auto space-y-10 sm:gap-5">
            {vehicles?.map((vehicle) => {
              return <Car {...vehicle} key={vehicle._id} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default QuerySection;
