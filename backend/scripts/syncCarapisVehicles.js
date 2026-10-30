import "dotenv/config";
import mongoose from "mongoose";
import Vehicle from "../models/Vehicle.js";

const API_URL = process.env.CARAPIS_VEHICLES_URL;
const PAGE_SIZE = 100;

function mapVehicle(car) {
  return {
    carapisId: car.id,
    make: car.brand_name,
    model: car.model_name,
    year: car.year,
    price_usd: car.price_usd,
    mileage: car.mileage ?? null,
    fuel_type: car.fuel_type || "other",
    transmission: car.transmission || "other",
    body_type: car.body_type || "other",
    color: car.color || "",
    thumbUrl:
      car.thumb?.original_url || car.thumb?.url || car.thumb?.thumb_url || "",
    photos: [
      ...new Set(
        (car.photos || [])
          .map((photo) => photo.original_url || photo.url || photo.thumb_url)
          .filter(Boolean),
      ),
    ],
    source: "system",
  };
}

async function syncVehicles() {
  if (!API_URL) {
    throw new Error("Please set CARAPIS_VEHICLES_URL in your .env file.");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Please set MONGO_URI in your .env file.");
  }
  if (!process.env.CARAPIS_API_KEY) {
    throw new Error("Please set CARAPIS_API_KEY in your .env file.");
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to MongoDB.");
  console.log("Starting CarApis vehicle sync...");

  let page = 1;
  let imported = 0;
  let failed = 0;
  let totalPages = Infinity;
  const MIN_YEAR = 2021;
  const POPULAR_MAKES = [
    "Toyota",
    "Mazda",
    "Nissan",
    "Honda",
    "Subaru",
    "Mitsubishi",
    "Suzuki",
    "Lexus",
    "Mercedes-Benz",
    "BMW",
    "Volkswagen",
    "Audi",
    "Volvo",
    "Land Rover",
    "Porsche",
  ];

  const isPopularVehicle = (car) => {
    const make = car.brand_name?.trim().toLowerCase();
    const popularMakes = POPULAR_MAKES.map((item) => item.toLowerCase());
    return (
      popularMakes.includes(make) &&
      Number(car.year) >= MIN_YEAR &&
      Number(car.year) <= new Date().getFullYear()
    );
  };

  try {
    while (page <= totalPages) {
      const url = new URL(API_URL);

      url.searchParams.set("source", "sbtjapan");
      url.searchParams.set("page_size", String(PAGE_SIZE));
      url.searchParams.set("page", String(page));

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.CARAPIS_API_KEY}`,
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();

        throw new Error(
          `CarApis request failed: ${response.status} ${errorBody}`,
        );
      }

      const data = await response.json();
      const cars = data.results || [];
      const filteredCars = cars.filter(isPopularVehicle);

      totalPages = Number(
        data.pages ?? Math.ceil((data.count ?? cars.length) / PAGE_SIZE),
      );

      if (cars.length === 0) break;

      for (const car of filteredCars) {
        try {
          if (
            !car.id ||
            !car.brand_name ||
            !car.model_name ||
            !car.year ||
            car.price_usd == null
          ) {
            console.warn(
              "Skipping vehicle with missing required fields:",
              car.id,
            );
            failed++;
            continue;
          }

          const vehicle = mapVehicle(car);
          if (!vehicle.thumbUrl) {
            console.warn(
              `Skipping ${car.brand_name} ${car.model_name}: no image`,
            );
            failed++;
            continue;
          }

          await Vehicle.updateOne(
            { carapisId: car.id },
            { $set: vehicle },
            { upsert: true, runValidators: true },
          );

          imported++;
        } catch (error) {
          failed++;
          console.error(`Failed to sync vehicle ${car.id}:`, error.message);
        }
      }

      console.log(
        `Fetched ${cars.length} cars. ${filteredCars.length} passed the filters.`,
      );

      page++;
    }

    console.log("\nCarApis sync completed.");
    console.log(`Successfully synced: ${imported}`);
    console.log(`Failed or skipped: ${failed}`);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

syncVehicles().catch((error) => {
  console.error("Vehicle sync failed:", error);
  process.exitCode = 1;
});
