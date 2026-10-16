import React from "react";
import { useState } from "react";
import { CalendarDays, CarFront, Image, FileText } from "lucide-react";

import { toast } from "react-toastify";
import api from "../services/api";

function AddImportForm() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    description: "",
    imageUrl: "",
    arrival: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      year: Number(formData.year),
      arrival: new Date(formData.arrival).toISOString(),
    };

    try {
      setLoading(true);
      const response = await api.post("/api/imports", payload);
      toast.success(response.data.message || "Import added successfully!");

      setFormData({
        make: "",
        model: "",
        year: "",
        description: "",
        imageUrl: "",
        arrival: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add import. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900">Add Past Import</h2>
        <p className="mt-1 text-sm text-gray-500">
          Record a vehicle imported for a customer.
        </p>
      </div>

      {/* Vehicle details */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="make">
            Vehicle Make
          </label>
          <input
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="e.g. Nissan"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="model">
            Vehicle Model
          </label>
          <input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. Juke"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="year">
            Manufacturing Year
          </label>
          <input
            id="year"
            name="year"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={handleChange}
            placeholder="e.g. 2017"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="arrival">
            Arrival Date
          </label>
          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              id="arrival"
              name="arrival"
              type="date"
              value={formData.arrival}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
              required
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass} htmlFor="description">
          Vehicle Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the vehicle's condition, seats, colour, features..."
          rows={4}
          className={inputClass}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className={labelClass} htmlFor="imageUrl">
          Vehicle Image URL
        </label>
        <div className="relative">
          <Image size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/car.jpg"
            className={`${inputClass} pl-10`}
            required
          />
        </div>

        {formData.imageUrl.startsWith("https://") && (
          <img
            src={formData.imageUrl}
            alt="Vehicle preview"
            className="mt-4 h-48 w-full rounded-xl border border-gray-200 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = "block";
            }}
          />
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Saving Import..." : "Save Import"}
      </button>
    </form>
  );
}

export default AddImportForm;
