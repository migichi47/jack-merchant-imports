import { useCars } from "../hooks/useCars";
import { Loader } from "lucide-react";

const PaginationButtons = () => {
  const { pagination, fetchVehicles, fetching } = useCars();

  return (
    <div className="text-gray-600 flex items-center gap-4">
      <button
        disabled={!pagination?.hasPrevPage}
        onClick={() => fetchVehicles(pagination?.currentPage - 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed
                  cursor-pointer hover:bg-pink-200 transition-all duration-300"
      >
        Previous
      </button>

      {fetching ? (
        <div className="flex items-center gap-2">
          loading <Loader className="animate-spin" size={20} />
        </div>
      ) : (
        <span>
          Page <span className="font-bold">{pagination?.currentPage ?? 0}</span>{" "}
          of <span className="font-bold">{pagination?.totalPages ?? 0}</span>
        </span>
      )}

      <button
        disabled={!pagination?.hasNextPage}
        onClick={() => fetchVehicles(pagination?.currentPage + 1)}
        className="rounded-lg border px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed
                  cursor-pointer hover:bg-pink-200 transition-all duration-300"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
