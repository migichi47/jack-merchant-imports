import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const allowedOrigins = [
  "http://localhost:5173",
  "https://jack-merchant-imports.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use("/api/vehicles", vehicleRoutes);

export default app;
