import express from "express";
import queriesRoutes from "./routes/queriesRoutes.js";
import connectDB from "./config/db.js";
import { config } from "dotenv";

config();
const app = express();
app.use(express.json());

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
};

startServer();

app.use("/api", queriesRoutes);
