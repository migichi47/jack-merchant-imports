const CARAPIS_BASE_URL = "https://api.carapis.com/apix/api";

export async function getCarapisVehicles(filters = {}) {
  const params = new URLSearchParams();

  const allowedFilters = [
    "source",
    "brand",
    "model",
    "min_year",
    "max_year",
    "min_price",
    "max_price",
    "fuel_type",
    "transmission",
    "body_type",
    "country",
    "page",
    "page_size",
    "ordering",
  ];

  for (const key of allowedFilters) {
    const value = filters[key];

    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  }

  const response = await fetch(
    `${CARAPIS_BASE_URL}/vehicles/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CARAPIS_API_KEY}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(15000),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Carapis error:", response.status, errorBody.slice(0, 500));
    throw new Error(`Carapis request failed with status ${response.status}`);
  }

  return response.json();
}
