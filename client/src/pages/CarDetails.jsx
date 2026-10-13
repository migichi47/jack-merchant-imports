import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { Dot } from "lucide-react";
import Button from "../components/Button";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState({});

  useEffect(() => {
    const fetchCar = async () => {
      const response = await api.get(`api/vehicles/${id}`);
      setCar(response.data);
    };
    fetchCar();
  }, [id]);

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
  } = car;

  return (
    <div className="space-y-10 mt-10">
      <h1 className="text-xl sm:text-2xl mx-auto w-fit text-center border-b border-gray-200">
        We'll help you find the car of{" "}
        <span className="font-bold">your choice</span>
      </h1>

      <div className="bg-gray-100 space-y-5 p-5 max-w-300 mx-auto relative rounded-lg">
        <h1 className="font-semibold text-lg">
          {make} {model} {year}
        </h1>
        <img src={imageUrl} alt="" className="rounded-lg" />
        <div
          className="flex flex-col gap-2 text-sm [&>span]:flex [&>span]:items-center [&>span]:gap-1.5
            [&>span]:[&>span]:font-semibold [&>span]:[&>span]:text-[17px]"
        >
          <span>
            <p>Transmission: </p>
            <span>{transmission}</span>
          </span>
          <span>
            <p>Drive Type: </p>
            <span>{drive_type}</span>
          </span>
          <span>
            <p>Fuel Type: </p>
            <span>{fuel_type}</span>
          </span>
          <span>
            <p>Body class: </p>
            <span>{body_class}</span>
          </span>
        </div>
        <Button
          className="absolute h-fit px-10 bottom-2 right-2 sm:bottom-10 sm:right-20"
          variant="secondary"
        >
          Talk to agent
        </Button>
      </div>
    </div>
  );
};

export default CarDetails;
