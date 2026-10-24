export const formatUSD = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);

export const formatMileage = (value) =>
  `${new Intl.NumberFormat("en-KE").format(value ?? 0)} km`;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Find a car", href: "#quick-search" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About us", href: "#about" },
];

export const carYears = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => 2000 + index,
);
