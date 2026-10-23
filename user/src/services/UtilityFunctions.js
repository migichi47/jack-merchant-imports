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

export const demoVehicles = [
  {
    id: "73f60f10-cc45-4809-9bb6-f9b811c9bad8",
    brand_name: "Mazda",
    model_name: "CX-5",
    trim: "20S",
    year: 2013,
    price_usd: 4000,
    mileage: 146000,
    fuel_type: "gasoline",
    transmission: "auto",
    body_type: "suv",
    color: "white",
    region: "NAGOYA, JAPAN",
    status: "active",
    is_available: true,
    has_accident: false,
    photos_count: 20,
    thumb: {
      url: "https://media.carapis.com/prod/media/vehicles/73f/60f/73f60f10-cc45-4809-9bb6-f9b811c9bad8/30dcf080f679405cbd70c2949c9221e5.webp",
    },
    photos: [],
  },
  {
    id: "demo-honda-shuttle",
    brand_name: "Honda",
    model_name: "Shuttle Hybrid",
    trim: "DAA-GP7",
    year: 2018,
    price_usd: 7700,
    mileage: 150000,
    fuel_type: "hybrid",
    transmission: "auto",
    body_type: "wagon",
    color: "black",
    region: "KOBE, JAPAN",
    status: "active",
    is_available: true,
    has_accident: false,
    photos_count: 0,
    thumb: null,
    photos: [],
  },
  {
    id: "demo-suzuki-jimny",
    brand_name: "Suzuki",
    model_name: "Jimny",
    trim: "",
    year: 2000,
    price_usd: 3650,
    mileage: 169000,
    fuel_type: "gasoline",
    transmission: "auto",
    body_type: "suv",
    color: "white",
    region: "HAKATA, JAPAN",
    status: "active",
    is_available: true,
    has_accident: null,
    photos_count: 0,
    thumb: null,
    photos: [],
  },
];

export const carMakes = {
  Toyota: [
    "Harrier",
    "Land Cruiser",
    "Prado",
    "RAV4",
    "Corolla",
    "Vitz",
    "Aqua",
    "Hilux",
    "Noah",
    "Voxy",
  ],

  Mazda: ["CX-5", "CX-3", "Demio", "Atenza", "Axela"],

  Honda: ["Vezel", "Fit", "CR-V", "Civic", "Freed"],

  Nissan: ["X-Trail", "Note", "Juke", "Serena", "Leaf"],

  Subaru: ["Forester", "Impreza", "Outback", "XV"],
};

export const carYears = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, index) => 2000 + index,
);
