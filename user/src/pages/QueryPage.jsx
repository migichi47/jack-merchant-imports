import { useState } from "react";
import { makes, years } from "../data/vehicleOptions";
import Button from "../components/Button";
import { ArrowLeft, Check, CircleAlert, MoveUpRightIcon } from "lucide-react";
import api from "../api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const QueryPage = () => {
  const initialForm = {
    yearFrom: "",
    yearTo: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    budget: "",
    description: ""
  };
  const [formData, setFormData] = useState(initialForm);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const navigate = useNavigate();
  const currentMake = makes.find((m) => m.name === make);
  const availableModels = currentMake?.models ?? [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = `
    Greetings, I am ${formData.fullName}, loooking for ${make} ${model} year: ${formData.yearFrom} - ${formData.yearTo}\n
    Contact: ${formData.phoneNumber}\n
    Email: ${formData.email}\n
    Budget: ${formData.budget}\n
    `;

    const formSubmitted = {
      fullName: formData.fullName,
      contact: formData.phoneNumber,
      email: formData.email,
      budget: formData.budget,
      description: formData.description,
      car: {
        make,
        model,
        year: {
          from: Number(formData.yearFrom),
          to: Number(formData.yearTo),
        },
      },
    };

    console.log(formSubmitted);

    try {
      const response = await api.post("/api/queries", formSubmitted);
      toast.success(
        response.data.message ||
          "Your quotation request was submitted successfully!",
      );
      setSubmissionSuccess(true);

      setFormData(initialForm);
      setMake("");
      setModel("");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (error.response
          ? "Unable to submit your request. Please try again."
          : "Network error. Please check your connection and try again.");

      toast.error(message);
      console.error(
        "Submission failed:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      {submissionSuccess ? (
        <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
          <h1 className="text-xl font-semibold flex gap-2 items-center bg-green-300 px-5 py-2 rounded-2xl">
            Request Success
            <Check />
          </h1>
          <p>We have received your request and we will get-in-touch in a few</p>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft />
            Back to Homepage
          </Button>
        </div>
      ) : (
        <form
          className="max-w-200 mx-auto flex flex-col items-center space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold capitalize">
              Tell Us what You have in mind
            </h2>
            <h3 className="text-gray-500 text-xs">
              Fields marked <span className="text-red-600 text-lg">*</span> are
              required.
            </h3>
          </div>
          <div
            className="grid sm:grid-cols-2 w-full px-10 flex-col items-center gap-5 [&>div]:[&>label]:font-semibold
            [&>div]:[&>label]:text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-1 [&>div]:[&>input]:border 
            [&>div]:[&>input]:border-gray-300 [&>div]:[&>input]:w-full [&>div]:[&>input]:px-4 [&>div]:[&>input]:py-2
            [&>div]:[&>input]:rounded-lg [&>div]:[&>input]:text-sm [&>div]:w-full [&>div]:[&>select]:px-4 [&>div]:[&>select]:py-2 
            [&>div]:[&>select]:rounded-lg [&>div]:[&>select]:text-sm [&>div]:[&>select]:border [&>div]:[&>select]:border-gray-300
            [&>div]:[&>select]:w-full"
          >
            <div>
              <label htmlFor="">
                Full name <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">
                Phone number <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="Your contact number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Email (optional)</label>
              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">
                Preferred vehicle make{" "}
                <span className="text-red-600 text-lg">*</span>
              </label>
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
              <label htmlFor="">
                Preferred model <span className="text-red-600 text-lg">*</span>
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                required
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
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="text-sm font-semibold">
                Preferred year of range{" "}
                <span className="text-red-600 text-lg">*</span>
              </label>
              <div
                className="flex items-center gap-2 [&>select]:px-4 [&>select]:py-2 [&>select]:rounded-lg [&>select]:outline-0
              [&>select]:text-sm [&>select]:border [&>select]:border-gray-300
              [&>select]:w-full"
              >
                <select
                  name="yearFrom"
                  id=""
                  value={formData.yearFrom}
                  onChange={handleChange}
                  required
                >
                  <option value={""} className="text-gray-400">
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
                  name="yearTo"
                  id=""
                  value={formData.yearTo}
                  onChange={handleChange}
                  required
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
            <div>
              <label htmlFor="">Estimated budget (optional)</label>
              <input
                type="text"
                placeholder="e.g. 2,500,000"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="">Description (optional)</label>
              <textarea
                type="text"
                placeholder="Enter vehicle description..."
                className="border border-gray-300 w-full px-4 py-2 rounded-lg text-sm"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bg-gray-200 p-5 flex gap-5 text-gray-500 text-sm mx-4 rounded-lg">
            <CircleAlert />
            <p>
              This is a quotation inquiry, not a purchase or confirmed order.
              Costs, requirements and next steps will be confirmed for inquiry.
            </p>
          </div>

          <Button type="submit">
            Request my quote
            <MoveUpRightIcon className="w-4" />
          </Button>
        </form>
      )}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default QueryPage;
