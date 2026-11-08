export const formatUSD = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

export const formatMileage = (value: number) =>
  `${new Intl.NumberFormat("en-KE").format(value ?? 0)} km`;
