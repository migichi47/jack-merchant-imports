import { useState } from "react";
import { makes, years } from "../data/vehicleOptions";
import Button from "../components/Button";
import { CircleAlert, MoveUpRightIcon } from "lucide-react";

const QueryPage = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const currentMake = makes.find((m) => m.name === make);
  const availableModels = currentMake?.models ?? [];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-200 mx-auto flex flex-col items-center space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold capitalize">
            Tell Us what You have in mind
          </h2>
          <h3 className="text-gray-500">Fields marked * are required.</h3>
        </div>
        <div
          className="grid sm:grid-cols-2 w-full px-10 flex-col items-center gap-5 [&>div]:[&>label]:font-semibold [&>div]:[&>label]:text-sm [&>div]:flex
        [&>div]:flex-col [&>div]:gap-1 [&>div]:[&>input]:border [&>div]:[&>input]:border-gray-300 [&>div]:[&>input]:w-full
        [&>div]:[&>input]:px-4 [&>div]:[&>input]:py-2 [&>div]:[&>input]:rounded-lg [&>div]:[&>input]:text-sm [&>div]:w-full
        [&>div]:[&>select]:px-4 [&>div]:[&>select]:py-2 [&>div]:[&>select]:rounded-lg [&>div]:[&>select]:text-sm [&>div]:[&>select]:border
        [&>div]:[&>select]:border-gray-300 [&>div]:[&>select]:w-full"
        >
          <div>
            <label htmlFor="">Full name *</label>
            <input type="text" required placeholder="Your full name" />
          </div>
          <div>
            <label htmlFor="">Phone number *</label>
            <input type="text" required placeholder="Your contact number" />
          </div>
          <div>
            <label htmlFor="">Email (optional)</label>
            <input type="email" placeholder="Your email address" />
          </div>
          <div>
            <label htmlFor="">Preferred vehicle make *</label>
            <select
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                setModel("");
              }}
              required
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
          </div>
          <div>
            <label htmlFor="">Preferred model *</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
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
          <div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold">
                Preferred year of range
              </label>
              <div
                className="flex items-center gap-2 [&>select]:px-4 [&>select]:py-2 [&>select]:rounded-lg [&>select]:outline-0
              [&>select]:text-sm [&>select]:border [&>select]:border-gray-300
              [&>select]:w-full"
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
          </div>
          <div>
            <label htmlFor="">Estimated budget (optional)</label>
            <input type="text" placeholder="e.g. 2,500,000" />
          </div>
        </div>
        <div className="bg-gray-200 p-5 flex gap-5 text-gray-500 text-sm mx-4 rounded-lg">
          <CircleAlert />
          <p>
            This is a quotation inquiry, not a purchase or confirmed order.
            Costs, requirements and next steps will be confirmed for inquiry.
          </p>
        </div>

        <Button variant="secondary" className="w-">
          Request my quote <MoveUpRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default QueryPage;
