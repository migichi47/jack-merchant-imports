import { Loader } from "lucide-react";
import { useCars } from "../hooks/useCars";
import CarSlider from "./CarSlider";

const Hero = () => {
  const { sliderVehicles } = useCars();

  return (
    <section id="home" className="py-10 px-5 flex items-center">
      <div className="max-w-7xl mx-auto">
        
        {sliderVehicles.length === 0 ? <HeroFallback /> : <CarSlider />}
      </div>
    </section>
  );
};

export default Hero;

function HeroFallback() {
  return (
    <div className="bg-gray-100 overflow-hidden mb-8 h-120 w-100 sm:w-150 md:w-200 lg:w-300 flex items-center justify-center">
      <div className="flex w-fit h-fit mx-auto text-lgsm:text-2xl font-semibold gap-2 items-center">
        Fetching vehicle <Loader className="animate-spin" />
      </div>
    </div>
  );
}
