import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/api/vehicles", vehicleRoutes);

export default app;
