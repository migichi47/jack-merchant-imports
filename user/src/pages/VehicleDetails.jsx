import { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Fuel,
  Gauge,
  Settings2,
  CarFront,
  CalendarDays,
  LoaderCircle,
  MessageCircle,
  Images,
} from "lucide-react";

import api from "../services/api";
import { CarContext } from "../context/CarContext";
import { QueryForm } from "../components/QueryForm";

const VehicleDetails = () => {
  const { id } = useParams();
  const { handleEnquire } = useContext(CarContext);
  const [vehicle, setVehicle] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const targetRef = useRef(null);

  const scrollToSection = () => {
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get(`/api/vehicles/${id}`);
        const data = response.data;
        setVehicle(data);
        setActiveImage(data.thumbUrl);
      } catch (err) {
        console.error(err);
        setError("We couldn't find this vehicle.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoaderCircle className="animate-spin text-red-600" size={36} />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <CarFront size={48} className="text-gray-400" />
        <h2 className="text-xl font-semibold">
          {error || "Vehicle not found"}
        </h2>
        <Link to="/" className="text-red-600 font-medium hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  // Combine the main image and gallery images without duplicates
  const images = [
    ...new Set([vehicle.thumbUrl, ...(vehicle.photos || [])].filter(Boolean)),
  ];

  const specifications = [
    {
      label: "Year",
      value: vehicle.year,
      icon: CalendarDays,
    },
    {
      label: "Mileage",
      value: vehicle.mileage
        ? `${Number(vehicle.mileage).toLocaleString()} km`
        : "Not specified",
      icon: Gauge,
    },
    {
      label: "Fuel type",
      value: vehicle.fuel_type || "Not specified",
      icon: Fuel,
    },
    {
      label: "Transmission",
      value: vehicle.transmission || "Not specified",
      icon: Settings2,
    },
    {
      label: "Body type",
      value: vehicle.body_type || "Not specified",
      icon: CarFront,
    },
    {
      label: "Engine capacity",
      value: vehicle.engine_capacity
        ? `${vehicle.engine_capacity} cc`
        : "Not specified",
      icon: Gauge,
    },
    {
      label: "Drive type",
      value: vehicle.drive_type || "Not specified",
      icon: Settings2,
    },
    {
      label: "Exterior colour",
      value: vehicle.color || "Not specified",
      icon: CarFront,
    },
  ];

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-7">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        {/* Vehicle heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-red-600 mb-2">
            VEHICLE DETAILS
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h1>

          <p className="text-gray-500 mt-2">{vehicle.year} model</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Image gallery */}
          <section className="lg:col-span-3">
            {/* Main image */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3] relative">
              <img
                src={activeImage || vehicle.thumbUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-xs font-medium text-gray-700">
                <Images size={14} className="inline mr-2" />
                {images.length} Photos
              </div>
            </div>

            {/* Thumbnail gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(image)}
                    className={`shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition ${
                      activeImage === image
                        ? "border-red-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${vehicle.make} ${vehicle.model} photo ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Vehicle information */}
          <aside className="lg:col-span-2">
            {/* Price */}
            <div className="border border-gray-200 rounded-2xl p-6">
              <p className="text-sm text-gray-500 mb-2">
                Estimated listing price
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {vehicle.price_usd
                  ? `$${Number(vehicle.price_usd).toLocaleString()}`
                  : "Price on request"}
              </h2>
              <p className="text-xs text-gray-400 mt-2">
                Indicative vehicle price. Final import costs and charges will be
                confirmed through a quotation.
              </p>
              <div className="border-t border-gray-100 my-6" />
              <h3 className="font-semibold text-gray-900 mb-4">
                Vehicle overview
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {specifications.map((spec) => {
                  const Icon = spec.icon;

                  return (
                    <div key={spec.label} className="flex gap-3">
                      <div className="text-red-600 mt-1">
                        <Icon size={19} />
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">{spec.label}</p>
                        <p className="text-sm font-medium text-gray-800 capitalize">
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  handleEnquire(vehicle);
                  scrollToSection();
                }}
                className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition"
              >
                <MessageCircle size={19} />
                Inquire About a Similar Vehicle
                <ArrowRight size={18} />
              </button>

              <p className="text-xs text-center text-gray-400 mt-3">
                Let us help you source a similar vehicle.
              </p>
            </div>

            {/* Trust information */}
            <div className="mt-5 bg-gray-50 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">
                Why import with us?
              </h3>

              <div className="space-y-3">
                {[
                  "Guidance throughout the import process",
                  "Vehicle sourcing based on your budget",
                  "Regular communication and updates",
                ].map((item) => (
                  <div key={item} className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2
                      size={17}
                      className="text-green-600 shrink-0"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <section className="mt-16 bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <p className="text-red-400 font-medium text-sm mb-3">
              YOUR NEXT CAR COULD BE HERE
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Looking for something similar?
            </h2>

            <p className="text-gray-300 leading-relaxed mb-7">
              Tell us the vehicle you want, your preferred year and your budget.
              We'll help you find an option that matches your needs.
            </p>

            <button
              onClick={() => {
                handleEnquire(vehicle);
                scrollToSection();
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-3 transition"
            >
              Request a quote
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
      <QueryForm ref={targetRef} />
    </main>
  );
};

export default VehicleDetails;
