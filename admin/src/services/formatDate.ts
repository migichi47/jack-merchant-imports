export const formatDate = (date: Date) => {
  if (!date) return "N/A";
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate; // 15 Oct 2026
};

