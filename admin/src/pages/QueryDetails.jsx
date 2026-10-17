import React from "react";
import Button from "../components/Button";
import { CarFront, Dot } from "lucide-react";
import StatusBar from "../components/StatusBar";

const QueryDetails = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Enquiry from Brian Mwangi</h1>
        <span className="text-gray-500 text-sm">
          Received 14 Oct 2026 at 10:42 AM
        </span>
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-300">
        <h2 className="font-bold text-lg">Customer enquiry</h2>
        <div className="space-y-5">
          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-3">
            <CarFront className="text-gray-500" />
            <div className="leading-5">
              <h3>Vehicle of Interest</h3>
              <p className="font-semibold text-lg">Toyota Harrier 2021</p>
            </div>
          </div>
          <p className="text-gray-600">
            Hello jm imports, I am Interested in importing a white Toyota
            Harrier, manufactured in 2021... Thank you.
          </p>
          <div className="flex gap-5">
            <Button variant="secondary">Email Customer</Button>
            <Button className="bg-green-600">Whatsapp Customer</Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-200">
        <h2 className="font-bold text-lg">Customer details</h2>
        <div className="space-y-5">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Name</span>
            <span>Brian Mwangi</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Email</span>
            <span>BrianMwangi@gmail</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-xs">Phone</span>
            <span>0721331784</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 space-y-4 border border-gray-200">
        <h2 className="font-bold text-lg">Status & Assignment</h2>
        <div className="space-y-5">
          <StatusBar />
          <div className="flex gap-4">
            <Button variant="secondary">Mark as Replied</Button>
            <Button
              className="bg-transparent text-black border border-gray-300"
              variant={null}
            >
              Mark as In Progress
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button>Delete Query</Button>
      </div>
    </div>
  );
};

export default QueryDetails;
