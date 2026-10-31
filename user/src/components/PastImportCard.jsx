import { CalendarDays, CarFront } from "lucide-react";

const PastImportCard = ({
  _id,
  make,
  model,
  year,
  description,
  imageUrl,
  arrival,
}) => {
  const formattedDate = arrival
    ? new Date(arrival).toLocaleDateString("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  return (
    <article
      key={_id}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Vehicle Image */}
      <div className="h-52 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${make} ${model}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full">
            Past Import
          </span>

          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CalendarDays size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900">
          {make} {model}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <CarFront size={16} />
          <span>Year: {year}</span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mt-4 line-clamp-3">
          {description}
        </p>
      </div>
    </article>
  );
};

export default PastImportCard;
