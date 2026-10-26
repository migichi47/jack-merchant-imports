import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Cog, Fuel, Gauge } from "lucide-react";
import { useCars } from "../hooks/useCars.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CarSlider = () => {
  const { sliderVehicles } = useCars();

  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="flex max-w-md sm:max-w-150 md:max-w-200 lg:max-w-300"
    >
      {sliderVehicles.map((car) => (
        <SwiperSlide>
          <div className="sm:grid grid-cols-2 bg-gray-100 overflow-hidden mb-8">
            <img
              src={car?.thumb.url || car.photos[0].url}
              alt="car image"
              className="hover:scale-102 transition my-auto"
            />
            <div className="p-5 flex flex-col justify-center gap-4">
              <h1 className="lg:text-4xl sm:text-3xl text-2xl leading-6 sm:leading-8 lg:leading-10 font-bold">
                <span>
                  {car.year} {car.brand_name}
                </span>{" "}
                <br />
                <span className="text-gray-600 text-2xl">{car.model_name}</span>
              </h1>
              <p className="text-gray-500 text-xs inline-flex gap-4">
                <span>{car.body_type}</span> <span>{car.trim}</span>
                <span className="text-pink-500">
                  {car.has_accident ? "has accident" : "no accident"}
                </span>
              </p>
              <p className="text-sm">
                Est import cost:{" "}
                <span className="font-semibold text-lg">
                  Usd.{car.price_usd}
                </span>
              </p>
              <div className="flex justify-around text-sm">
                <span className="flex gap-2 text-gray-600 items-center">
                  <Gauge className="w-4" />
                  <span className="">{car.mileage?.toLocaleString()}</span> km
                </span>
                <span className="flex gap-2 text-gray-600 items-center">
                  <Fuel className="w-4" />
                  <span className="capitalize">{car.fuel_type}</span>
                </span>
                <span className="flex gap-2 text-gray-600 items-center">
                  <Cog className="w-4" />
                  <span className="capitalize">{car.transmission}</span>
                </span>
              </div>
              <button className="bg-red-600 text-white px-2 font-semibold py-2 cursor-pointer">
                Enquire similar car
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarSlider;
