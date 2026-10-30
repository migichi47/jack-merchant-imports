export const carYears = Array.from(
  { length: new Date().getFullYear() - 2020 + 1 },
  (_, index) => 2020 + index,
);
