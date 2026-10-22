import { ArrowUpRight, Fuel, Gauge, ShieldCheck, Zap } from "lucide-react";
import { formatMileage, formatUSD } from "../services/UtilityFunctions";
import VehicleImage from "./VehicleImage";

export default function VehicleCard({ vehicle, onRequestQuote }) {
  const vehicleName = `${vehicle.brand_name} ${vehicle.model_name}`;

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <VehicleImage vehicle={vehicle} />

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm">
          {vehicle.year}
        </span>

        <span className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white">
          {vehicle.is_available ? "Available listing" : "Check availability"}
        </span>
      </div>

      <div className="p-5">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-red-600">
          {vehicle.region || "Japan"}
        </p>

        <h3 className="text-xl font-bold text-neutral-950">{vehicleName}</h3>

        <p className="mt-1 text-sm text-neutral-500">
          {vehicle.trim || "Standard trim"}
        </p>

        <div className="my-4 grid grid-cols-2 gap-3 border-y border-neutral-100 py-4 text-sm text-neutral-600">
          <span className="flex items-center gap-2">
            <Gauge size={16} className="text-red-600" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-2 capitalize">
            <Fuel size={16} className="text-red-600" />
            {vehicle.fuel_type || "Not specified"}
          </span>
          <span className="flex items-center gap-2 capitalize">
            <Zap size={16} className="text-red-600" />
            {vehicle.transmission || "Not specified"}
          </span>
          <span className="flex items-center gap-2 capitalize">
            <ShieldCheck size={16} className="text-red-600" />
            {vehicle.has_accident === false
              ? "No accident reported"
              : vehicle.has_accident === true
                ? "Accident reported"
                : "Condition unverified"}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-neutral-500">Listed price in Japan</p>
            <p className="mt-1 text-2xl font-extrabold text-neutral-950">
              {formatUSD(vehicle.price_usd)}
            </p>
          </div>

          <button
            onClick={() => onRequestQuote(vehicle)}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Enquire <ArrowUpRight size={16} />
          </button>
        </div>

        <p className="mt-3 text-xs leading-5 text-neutral-500">
          Japan listing price only. Shipping, taxes, duties and other import
          costs require a separate quotation.
        </p>
      </div>
    </article>
  );
}
