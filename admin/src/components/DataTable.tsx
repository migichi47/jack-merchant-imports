import { Trash } from "lucide-react";
import { useAdminContext, type Query } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatusBar from "./StatusBar";
import { toast } from "react-toastify";
import type { ReactNode } from "react";

// Extend Query with the fields used by this component
type DataTableQuery = Query & {
  fullName?: string;
  contact?: string;
  budget?: number | string;
  status?: string;
  car?: {
    make?: string;
    model?: string;
    year?: {
      from?: number | string;
      to?: number | string;
    };
  };
};

type DataTableProps = {
  data: DataTableQuery[];
};

type Column = {
  key: string;
  label: string;
  render?: (row: DataTableQuery) => ReactNode;
};

function DataTable({ data }: DataTableProps) {
  const navigate = useNavigate();
  const { deleteQuery, setQueries, queries } = useAdminContext();
  const columns: Column[] = [
    {
      key: "fullName",
      label: "Customer Name",
      render: (row) => `${row.fullName}`,
    },
    {
      key: "contact",
      label: "Phone",
      render: (row) => `${row.contact} `,
    },
    {
      key: "car",
      label: "Vehicle",
      render: (row) => `${row.car.make} ${row.car.model}`,
    },
    {
      key: "year",
      label: "Year",
      render: (row) =>
        `${row?.car?.year?.from || "any"} - ${row?.car?.year?.to || "any"}`,
    },
    {
      key: "budget",
      label: "Budget",
      render: (row) => `Ksh ${row?.budget || "N/A"}`,
    },
    {
      key: "createdAt",
      label: "Date Received",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  ];

  const openQuery = async (row: DataTableQuery) => {
    navigate(`/queries/${row._id ?? row.id}`);
    await api.patch(`/api/queries/${row._id ?? row.id}`, {
      status: "inprogress",
    });
  };

  return (
    <div className="w-full overflow-x-auto bg-white">
      <table className="w-full text-left text-sm">
        {/* Table headings */}
        <thead className="bg-gray-50 relative text-gray-600">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="whitespace-nowrap px-6 py-4 font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
          <tr
            onClick={async () => {
              if (!queries || queries.length === 0) return;
              const response = confirm("delete all queries");
              if (!response) return;
              await api.delete("/api/queries/all");
              toast.success("all queries deleted");
              setQueries([]);
            }}
          >
            <td
              className={`absolute right-2 top-2 bg-red-600 py-2 px-4 text-white rounded-full
              hover:bg-red-800 transition ${!queries || queries.length === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              delete all
            </td>
          </tr>
        </thead>

        {/* Table body */}
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr
              key={row._id ?? row.id ?? index}
              className="transition-colors hover:bg-gray-50 cursor-pointer"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="whitespace-nowrap px-6 py-4 text-gray-700"
                  onClick={() => openQuery(row)}
                >
                  {column.render ? column.render(row) : "N/A"}
                </td>
              ))}
              <td className="mt-3 flex gap-5 items-center">
                <Trash
                  className="w-4 text-pink-500 hover:text-red-600"
                  onClick={() => deleteQuery(row._id ?? row.id)}
                />
                <StatusBar status={row?.status} />
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
