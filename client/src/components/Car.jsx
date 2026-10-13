import { ArrowRight, Dot } from "lucide-react";
import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Car = (vehicle) => {
  const navigate = useNavigate();

  const {
    body_class,
    complaint_count,
    cylinders,
    displacement_l,
    doors,
    drive_type,
    fuel_type,
    horsepower,
    image_type,
    imageUrl,
    investigation_count,
    make,
    model,
    recall_count,
    submodel,
    transmission,
    trim,
    tsb_count,
    year,
  } = vehicle;
  
  const id = vehicle.id ?? vehicle._id

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };
  return (
    <div
      className="border border-gray-200 rounded-lg hover:scale-98 transition-all duration-300 ease-in-out cursor-pointer
      w-fit p-2 flex flex-col gap-2 h-fit"
    >
      <img
        src={
          imageUrl ??
          "https://framerusercontent.com/images/95P5QpqVVPD3iWrbpwzFZaTyfRg.jpg?width=700&height=431"
        }
        alt=""
        className="rounded-lg object-cover"
      />
      <div className="bg-gray-100 p-2 border border-gray-200 rounded-lg space-y-2 relative">
        <h1 className="font-semibold text-gray-600">
          {make} {model}
        </h1>
        <p className="text-gray-500 text-sm">
          <span>{transmission}</span>
          <span>{horsepower} hp</span>
        </p>
        <hr className="text-gray-200" />
        <p className="text-gray-500 text-sm flex items-center">
          <span>{drive_type}</span>
          <Dot />
          <span> {fuel_type}</span>
        </p>
        <Button
          className="absolute top-2 right-2 text-xs"
          variant="secondary"
          onClick={() => handleClick(id)}
        >
          Enquire <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Car;
