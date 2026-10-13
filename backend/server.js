import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import popularCarRoutes from "./routes/popularCarRoute.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Local MongoDB connected"))
  .catch((err) => console.error(err));

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
app.use("/api/popular-cars", popularCarRoutes);

app.listen(3000);
export default app;
