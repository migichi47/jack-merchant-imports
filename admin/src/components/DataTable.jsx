function DataTable({ data }) {
  const columns = [
    {
      key: "fullName",
      label: "Customer Name",
    },
    {
      key: "contact",
      label: "Phone",
    },
    {
      key: "car",
      label: "Vehicle",
      render: (row) => `${row.car.make} ${row.car.model}`,
    },
    {
      key: "year",
      label: "Year",
      render: (row) => `${row.car.year.from} - ${row.car.year.to}`,
    },
    {
      key: "budget",
      label: "Budget",
      render: (row) => `Ksh ${row.budget}`,
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

  return (
    <div className="w-full overflow-x-auto bg-white">
      <table className="w-full text-left text-sm">
        {/* Table headings */}
        <thead className="bg-gray-50 text-gray-600">
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
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
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
