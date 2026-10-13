import React from "react";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams()
  return (
    <div>
      <h1>We'll help you find the car of your choice</h1>

      <div className="bg-gray-200">
        <div className="flex gap-5">
          <div>
            <h1>Rolls-Royce Phantom</h1>
            <img
              src="https://framerusercontent.com/images/fvW0oUX2OTc31AikTdd6AnRKwc.jpg?width=700&height=431"
              alt=""
              className="rounded-lg"
            />
            <div>
              <p className="text-gray-500 text-sm">
                {/* <span>{transmission}</span>
                <span>{horsepower} hp</span> */}
              </p>
              <hr className="text-gray-200" />
              <p className="text-gray-500 text-sm flex items-center">
                {/* <span>{drive_type}</span>
                <Dot />
                <span> {fuel_type}</span> */}
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
