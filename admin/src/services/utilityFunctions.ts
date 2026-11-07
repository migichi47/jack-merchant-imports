export const formatUSD = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

export const formatMileage = (value) =>
  `${new Intl.NumberFormat("en-KE").format(value ?? 0)} km`;
