import { ArrowRight, CheckCircle, Ship } from "lucide-react";
import { useCars } from "../hooks/useCars";
import CarSlider from "./CarSlider";

const Hero = () => {
  const { sliderVehicles } = useCars();

  if (sliderVehicles.length === 0)
    return (
      <section
        id="home"
        className="relative overflow-hidden bg-white px-5 py-20 sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          {/* Hero content */}
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
              <Ship size={16} />
              Japan to Kenya · Delivery within 60 days
            </span>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-6xl">
              Your Dream Car.
              <span className="block text-red-600">
                Imported With Confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Let Jack Merchants Imports help you source your ideal vehicle from
              Japan. We make the import process simple, transparent, and
              stress-free.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#request-quote"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-4 font-bold text-white transition
                hover:bg-red-700"
              >
                Request a Quote
                <ArrowRight size={18} />
              </a>

              <a
                href="#past-imports"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-4 font-bold text-gray-900
                transition hover:bg-gray-50"
              >
                View Past Imports
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-red-600" />
                Personalized sourcing
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-red-600" />
                Guided import process
              </span>
            </div>
          </div>

          {/* Visual panel — replace with a genuine past-import photo */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-red-50" />

            <div className="relative flex min-h-87.5 flex-col justify-between overflow-hidden rounded-2xl bg-gray-950 p-8
            text-white sm:min-h-110 sm:p-10">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-40 border-red-600/20" />

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
                  Your journey starts here
                </p>
                <h2 className="mt-4 max-w-sm text-3xl font-bold sm:text-4xl">
                  From Japan's roads to your driveway.
                </h2>
              </div>

              <div className="relative mt-12 border-t border-white/20 pt-6">
                <p className="text-sm text-gray-400">JACK MERCHANTS IMPORTS</p>
                <p className="mt-2 text-xl font-bold">
                  Find it. Source it. Import it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section id="home" className="py-10 px-5 flex items-center">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-10">
        <h1 className=" text-lg sm:text-2xl inline-flex font-black leading-[1.08] tracking-tight gap-2">
          <span className="text-red-500">Import</span>
          Your next car
          <span className="text-red-500">From Japan</span> to Kenya.
        </h1>
        <CarSlider />
      </div>
    </section>
  );
};

export default Hero;
