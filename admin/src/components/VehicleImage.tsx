import { Ship } from "lucide-react";
import { useState } from "react";

export default function VehicleImage({ vehicle }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = vehicle.thumbUrl;

  if (!imageUrl || failed) {
    return (
      <div className="flex h-full min-h-48 items-center justify-center bg-neutral-100">
        <div className="text-center text-neutral-400">
          <Ship size={34} className="mx-auto mb-2" />
          <p className="text-xs">Vehicle image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={`${vehicle.year} ${vehicle.brand_name} ${vehicle.model_name}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-full min-h-48 w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
}
