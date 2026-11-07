import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CarFront,
  Upload,
  ImagePlus,
  X,
  Trash2,
  Star,
  CheckCircle2,
  LoaderCircle,
  AlertCircle,
  Settings2,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../services/api";

const initialForm = {
  make: "",
  model: "",
  year: "",
  price_usd: "",
  mileage: "",
  fuel_type: "gasoline",
  transmission: "auto",
  body_type: "suv",
  color: "",
  engine_capacity: "",
  drive_type: "AWD",
};

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const inputClass = `w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800
  outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400`;
const labelClass = "mb-2 block text-sm font-medium text-gray-700";
const AddVehiclePage = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(initialForm);
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setError("");
    setSuccess("");
    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots <= 0) {
      setError(`Maximum of ${MAX_IMAGES} images allowed.`);
      e.target.value = "";
      return;
    }
    const validImages = [];
    for (const file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds the 5MB size limit.`);
        continue;
      }
      if (images.length + validImages.length >= MAX_IMAGES) {
        setError(`You can only upload ${MAX_IMAGES} images.`);
        break;
      }
      validImages.push({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }
    if (validImages.length > 0) {
      setImages((prev) => {
        const updated = [...prev, ...validImages];
        if (!coverImage) {
          setCoverImage(validImages[0].id);
        }

        return updated;
      });
    }

    e.target.value = "";
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const updated = prev.filter((image) => image.id !== id);

      if (coverImage === id) {
        setCoverImage(updated[0]?.id || null);
      }

      return updated;
    });
  };

  const selectCover = (id) => {
    setCoverImage(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Frontend validation
    if (images.length === 0) {
      setError("Please upload at least one vehicle image.");
      return;
    }
    if (!coverImage) {
      setError("Please select a cover image.");
      return;
    }
    if (
      Number(formData.year) < 1900 ||
      Number(formData.year) > new Date().getFullYear() + 1
    ) {
      setError("Please enter a valid vehicle year.");
      return;
    }
    if (Number(formData.price_usd) < 0) {
      setError("Price cannot be negative.");
      return;
    }
    try {
      setLoading(true);
      setUploadProgress(0);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      const orderedImages = [
        ...images.filter((image) => image.id === coverImage),
        ...images.filter((image) => image.id !== coverImage),
      ];

      orderedImages.forEach((image) => {
        data.append("images", image.file);
      });

      const response = await api.post("/api/vehicles", data, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );

            setUploadProgress(percentage);
          }
        },
      });

      setSuccess(response.data.message || "Vehicle added successfully!");
      setFormData(initialForm);
      setImages([]);
      setCoverImage(null);
      setUploadProgress(100);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Vehicle submission error:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong while adding the vehicle.",
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setImages([]);
    setCoverImage(null);
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            to="/vehicles"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to vehicles
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-red-600">
                <CarFront size={23} />
                <span className="text-xl font-semibold uppercase tracking-wider">
                  Vehicle Management
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Add New Vehicle
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Add a vehicle to your inventory and upload its images.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
            >
              <RotateCcw size={16} />
              Reset form
            </button>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={19} className="mt-0.5 shrink-0" />
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            <p>{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic information */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2.5 text-pink-500">
                    <CarFront size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Basic Information
                    </h2>
                    <p className="text-xs text-gray-500">
                      Vehicle identification and pricing
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      Make <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="make"
                      value={formData.make}
                      onChange={handleChange}
                      placeholder="e.g. Toyota"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      placeholder="e.g. Harrier"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Manufacturing Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g. 2022"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Price (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        $
                      </span>
                      <input
                        type="number"
                        name="price_usd"
                        value={formData.price_usd}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className={`${inputClass} pl-9`}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Mileage (KM)</label>
                    <input
                      type="number"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      placeholder="e.g. 45000"
                      min="0"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Color</label>
                    <input
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      placeholder="e.g. Pearl White"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* Specifications */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-orange-50 p-2.5 text-orange-600">
                    <Settings2 size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-900">
                      Vehicle Specifications
                    </h2>
                    <p className="text-xs text-gray-500">
                      Technical details and configurations
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Fuel Type</label>
                    <select
                      name="fuel_type"
                      value={formData.fuel_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="gasoline">Gasoline / Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="plug-in-hybrid">Plug-in Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="lpg">LPG</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Transmission</label>
                    <select
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="auto">Automatic</option>
                      <option value="manual">Manual</option>
                      <option value="cvt">CVT</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Body Type</label>
                    <select
                      name="body_type"
                      value={formData.body_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="wagon">Wagon</option>
                      <option value="coupe">Coupe</option>
                      <option value="van">Van</option>
                      <option value="pickup">Pickup</option>
                      <option value="minivan">Minivan</option>
                      <option value="convertible">Convertible</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Drive Type</label>
                    <select
                      name="drive_type"
                      value={formData.drive_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="FWD">Front Wheel Drive (FWD)</option>
                      <option value="RWD">Rear Wheel Drive (RWD)</option>
                      <option value="AWD">All Wheel Drive (AWD)</option>
                      <option value="4WD">Four Wheel Drive (4WD)</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Engine Capacity (CC)</label>
                    <input
                      type="number"
                      name="engine_capacity"
                      value={formData.engine_capacity}
                      onChange={handleChange}
                      placeholder="e.g. 2000"
                      min="0"
                      step="any"
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>

              {/* Image uploader */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                      <ImagePlus size={21} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Vehicle Images
                        <span className="ml-1 text-red-500">*</span>
                      </h2>
                      <p className="text-xs text-gray-500">
                        Upload photos of the vehicle
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                    {images.length}/{MAX_IMAGES} images
                  </span>
                </div>

                {/* Upload area */}
                {images.length < MAX_IMAGES && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/50 disabled:opacity-50"
                  >
                    <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600">
                      <Upload size={24} />
                    </div>

                    <p className="text-sm font-semibold text-gray-700">
                      Click to upload images
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Select one or multiple images
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                      JPG, PNG, WEBP · Maximum 5MB each
                    </p>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Image previews */}
                {images.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-700">
                        Selected Images
                      </p>
                      <p className="text-xs text-gray-400">
                        Select an image to set it as cover
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {images.map((image) => {
                        const isCover = coverImage === image.id;

                        return (
                          <div
                            key={image.id}
                            className={`group relative overflow-hidden rounded-xl border-2 transition ${
                              isCover
                                ? "border-blue-500 ring-2 ring-blue-100"
                                : "border-gray-200"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => selectCover(image.id)}
                              disabled={loading}
                              className="block w-full text-left"
                            >
                              <img
                                src={image.preview}
                                alt="Vehicle preview"
                                className="h-36 w-full object-cover sm:h-40"
                              />

                              <div className="p-2.5">
                                <p className="truncate text-xs font-medium text-gray-600">
                                  {image.file.name}
                                </p>

                                <p className="mt-1 text-[11px] text-gray-400">
                                  {(image.file.size / 1024 / 1024).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                            </button>

                            {isCover && (
                              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white shadow">
                                <Star size={11} fill="currentColor" />
                                COVER
                              </span>
                            )}

                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              disabled={loading}
                              title="Remove image"
                              className="absolute right-2 top-2 rounded-lg bg-black/60 p-2 text-white opacity-100 transition hover:bg-red-600 sm:opacity-0 sm:group-hover:opacity-100"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {images.length === 0 && (
                  <p className="mt-4 text-center text-xs text-red-500">
                    At least one image is required.
                  </p>
                )}

                {images.length > 0 && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-blue-50 p-3 text-xs text-blue-700">
                    <Star size={15} className="mt-0.5 shrink-0" />
                    <p>
                      The selected cover image will be saved as the vehicle's
                      thumbnail. You can change it by clicking another image.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Summary */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="mb-5 font-semibold text-gray-900">
                  Vehicle Summary
                </h2>

                <div className="mb-5 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                  {images.find((image) => image.id === coverImage) ? (
                    <img
                      src={
                        images.find((image) => image.id === coverImage).preview
                      }
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <CarFront size={38} />
                      <span className="text-xs">Vehicle preview</span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {formData.make || "Vehicle Make"} {formData.model || "Model"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {formData.year || "Year"} · {formData.body_type}
                </p>
                <div className="my-5 border-t border-gray-100" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="font-semibold text-gray-900">
                      {formData.price_usd
                        ? `$${Number(formData.price_usd).toLocaleString()}`
                        : "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Mileage</span>
                    <span className="font-medium text-gray-800">
                      {formData.mileage
                        ? `${Number(formData.mileage).toLocaleString()} KM`
                        : "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Fuel</span>
                    <span className="font-medium capitalize text-gray-800">
                      {formData.fuel_type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Transmission</span>
                    <span className="font-medium capitalize text-gray-800">
                      {formData.transmission}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Images</span>
                    <span className="font-semibold text-gray-800">
                      {images.length}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-green-50 p-3">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 size={16} />
                    <span className="text-xs font-semibold">
                      Admin Inventory
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-green-600">
                    This vehicle will be saved with source: admin.
                  </p>
                </div>
              </section>

              {/* Upload requirements */}
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-gray-900">
                  Submission Checklist
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      label: "Vehicle make",
                      done: !!formData.make.trim(),
                    },
                    {
                      label: "Vehicle model",
                      done: !!formData.model.trim(),
                    },
                    {
                      label: "Manufacturing year",
                      done: !!formData.year,
                    },
                    {
                      label: "Vehicle price",
                      done: !!formData.price_usd,
                    },
                    {
                      label: "At least one image",
                      done: images.length > 0,
                    },
                    {
                      label: "Cover image selected",
                      done: !!coverImage,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 text-xs"
                    >
                      {item.done ? (
                        <CheckCircle2 size={16} className="text-green-500" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-gray-300" />
                      )}

                      <span
                        className={
                          item.done ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submit */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                {loading && (
                  <div className="mb-4">
                    <div className="mb-2 flex justify-between text-xs text-gray-500">
                      <span>Uploading vehicle...</span>
                      <span>{uploadProgress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-300"
                        style={{
                          width: `${uploadProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CarFront size={18} />
                      Add Vehicle
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-gray-400">
                  Vehicle images will be securely uploaded to Cloudinary.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehiclePage;
