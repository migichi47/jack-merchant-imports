import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "../models/Vehicle.js";

dotenv.config();

const getTransmissions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected!");

    const transmissions = await Vehicle.aggregate([
      {
        $group: {
          _id: "$transmission",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    console.log(transmissions);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

getTransmissions();