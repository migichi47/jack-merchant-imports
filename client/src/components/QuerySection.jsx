import React, { useState } from "react";
import { makes, years } from "../data/vehicleOptions";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const QuerySection = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const currentMake = makes.find((make) => make.name === make);
  const availableModels = currentMake?.models ?? [];

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
                setSelectedModel("");
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
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
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
                return <option value={year} key={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-40"
          onClick={() => navigate("/import")}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default QuerySection;
