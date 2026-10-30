import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/loginRoutes.js";
import queriesRoutes from "./routes/queriesRoutes.js";
import importRoutes from "./routes/importRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import carapisRoutes from "./routes/carapisRoutes.js";
import vehiclesRoutes from "./routes/vehiclesRoutes.js";

const app = express();

const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  });
};

startServer();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://adminjack-merchant-imports.vercel.app",
      "https://jack-merchant-imports.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Accept"],
    credentials: true,
  }),
);
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  session({
    name: "jm-imports.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 60 * 60 * 8, // 8 hours
    }),

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none", // For cross-site frontend/backend requests
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/queries", queriesRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/imports", importRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/carapis", carapisRoutes);

app.use(express.urlencoded({ extended: true }));

export default app;
