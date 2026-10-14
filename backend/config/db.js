import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database: ", mongoose.connection.db.databaseName);
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

export async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}
