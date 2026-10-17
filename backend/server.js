import express from "express";
import queriesRoutes from "./routes/queriesRoutes.js";
import importRoutes from "./routes/importRoutes.js";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/queries", queriesRoutes);
app.use("/api/imports", importRoutes);

app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
};

startServer();

export default app;
