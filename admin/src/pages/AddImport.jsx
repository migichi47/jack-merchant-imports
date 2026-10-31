import { useState } from "react";
import { CalendarDays, Image, ImagePlus, X } from "lucide-react";

import { toast } from "react-toastify";
import api from "../services/api";
import SectionHeading from "../components/SectionHeading";
import Breadcrumbs from "../components/BreadCrumbs";
import { useRef } from "react";

function AddImportForm() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    description: "",
    arrival: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select a vehicle image");
      return;
    }
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("image", image);
    console.log([...data.entries()]);
    try {
      setLoading(true);
      const response = await api.post("/api/imports", data);
      console.log(data);
      toast.success(response.data.message || "Import added successfully!");
      setFormData({
        make: "",
        model: "",
        year: "",
        description: "",
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
    <>
      <Breadcrumbs
        items={[
          {
            label: "Add Import",
          },
        ]}
      />
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
      >
        <SectionHeading
          title="Add Past Import"
          description="Record a vehicle imported for a customer."
        />

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
          <label className="block text-sm font-semibold mb-2">
            Vehicle Image
          </label>

          {preview ? (
            <div className="relative w-full h-64 rounded-xl overflow-hidden border">
              <img
                src={preview}
                alt="Vehicle preview"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">
              <ImagePlus size={40} className="text-gray-400" />

              <span className="mt-3 text-sm font-medium">
                Click to upload vehicle image
              </span>

              <span className="text-xs text-gray-400 mt-1">
                PNG, JPG or WEBP (Max 5MB)
              </span>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
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
    </>
  );
}

export default AddImportForm;
