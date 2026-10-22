import VehicleCard from "./VehicleCard";
import {
  ArrowRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const QuerySection = ({
  openQuote,
  search,
  setSearch,
  make,
  setMake,
  makes,
  maxPrice,
  setMaxPrice,
  filteredVehicles,
}) => {
  return (
    <section
      id="vehicles"
      className="scroll-mt-24 bg-neutral-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
              Find your car
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
              Find a vehicle that fits you.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
              Explore sample listings and tell us which vehicle you are
              interested in importing. Availability and pricing must be
              confirmed before you make a decision.
            </p>
          </div>

          <button
            onClick={() => openQuote()}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold transition hover:border-red-600 hover:text-red-600 md:self-auto"
          >
            Can't find your car? <ArrowRight size={16} />
          </button>
        </div>

        {/* Search and filters */}
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
            <label className="relative block">
              <span className="mb-2 block text-xs font-semibold text-neutral-700">
                Search vehicles
              </span>
              <Search
                size={18}
                className="absolute left-3 top-10.75 text-neutral-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="e.g. Toyota Harrier"
                className="w-full rounded-lg border border-neutral-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-600/10"
              />
            </label>

            <label>
              <span className="mb-2 block text-xs font-semibold text-neutral-700">
                Make
              </span>
              <div className="relative">
                <select
                  value={make}
                  onChange={(event) => setMake(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 py-3 pr-9 text-sm outline-none focus:border-red-600"
                >
                  {makes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3.5 text-neutral-400"
                />
              </div>
            </label>

            <label>
              <span className="mb-2 block text-xs font-semibold text-neutral-700">
                Maximum listed price
              </span>
              <div className="relative">
                <select
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                  className="w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3 py-3 pr-9 text-sm outline-none focus:border-red-600"
                >
                  {[
                    "Any budget",
                    "Under $3,000",
                    "Under $5,000",
                    "Under $10,000",
                    "Under $15,000",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-3.5 text-neutral-400"
                />
              </div>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4">
            <p className="flex items-center gap-2 text-sm text-neutral-500">
              <SlidersHorizontal size={16} />
              {filteredVehicles.length} vehicles matching your filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setMake("All makes");
                setMaxPrice("Any budget");
              }}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Reset filters
            </button>
          </div>
        </div>

        {/* Vehicle cards */}
        {filteredVehicles.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.slice(0, 9).map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onRequestQuote={openQuote}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
            <Search size={32} className="mx-auto text-neutral-400" />
            <h3 className="mt-4 text-xl font-bold">No matching vehicles</h3>
            <p className="mt-2 text-sm text-neutral-500">
              Try different filters or ask us to source your preferred car.
            </p>
            <button
              onClick={() => openQuote()}
              className="mt-5 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Request a vehicle
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs leading-6 text-neutral-500">
          Demo listings are provided for UI development. Vehicle details,
          availability, pricing and condition should be verified before
          publication. Displayed prices are not Kenyan landed costs.
        </p>
      </div>
    </section>
  );
};

export default QuerySection;
