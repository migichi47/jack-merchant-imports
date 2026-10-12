import express from "express";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/vehicleRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/vehicles", vehicleRoutes);

app.listen(3000, () => {
  console.log("server is running on Port 3000");
});
