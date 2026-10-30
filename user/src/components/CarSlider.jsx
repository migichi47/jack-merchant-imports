import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Cog, Fuel, Gauge } from "lucide-react";
import { useCars } from "../hooks/useCars.js";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";

const CarSlider = () => {
  const { sliderVehicles } = useCars();
  const navigate = useNavigate();

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
              src={car?.thumbUrl || car.photos[0].url}
              alt="car image"
              className="hover:scale-102 transition my-auto"
            />
            <div className="p-5 flex flex-col justify-center gap-4">
              <h1 className="lg:text-4xl sm:text-3xl text-2xl leading-6 sm:leading-8 lg:leading-10 font-bold">
                <span>
                  {car.year} {car.make}
                </span>{" "}
                <br />
                <span className="text-gray-600 text-2xl">{car.model}</span>
              </h1>
              <p className="text-pink-500 font-semibold text-sm inline-flex gap-2">
                <span>{car.body_type}</span> <span>{car.color}</span>
              </p>
              <p className="text-sm">
                Est import cost:{" "}
                <span className="font-semibold text-lg">
                  Usd. {car.price_usd?.toLocaleString()}
                </span>
              </p>
              <div className="flex justify-around text-sm [&>span]:flex [&>span]:gap-2 [&>span]:text-gray-600 [&>span]:items-center">
                <span>
                  <Gauge className="w-4" />
                  <span className="">{car.mileage?.toLocaleString()}</span> km
                </span>
                <span>
                  <Fuel className="w-4" />
                  <span className="capitalize">{car.fuel_type}</span>
                </span>
                <span>
                  <Cog className="w-4" />
                  <span className="capitalize">{car.transmission}</span>
                </span>
              </div>
              <button
                className="bg-red-600 text-white px-2 font-semibold py-2 cursor-pointer"
                onClick={() => navigate(`/vehicles/${car._id}`)}
              >
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
