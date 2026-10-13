import React, { useState } from "react";
import { makes, years } from "../../data/vehicleOptions";

const QuerySection = () => {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const currentMake = makes.find((make) => make.name === selectedMake);
  const availableModels = currentMake?.models ?? [];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-200 mx-auto flex flex-col items-center space-y-4">
        <h2 className="text-2xl sm:text-4xl font-bold">What are you looking for?</h2>
        <h3 className="text-gray-500 underline">Search Cars</h3>
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-5">
            <select
              value={selectedMake}
              onChange={(e) => {
                setSelectedMake(e.target.value);
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
              disabled={!selectedMake}
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
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              <option value="" className="text-gray-400">
                from
              </option>
              {years.map((year) => {
                return <option value={year} key={year}>{year}</option>;
              })}
            </select>
            <span>-</span>
            <select
              name=""
              id=""
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            >
              <option value="" className="text-gray-400">
                to
              </option>
              {years.map((year) => {
                return <option value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuerySection;
