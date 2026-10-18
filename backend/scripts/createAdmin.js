import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "Set ADMIN_USERNAME and ADMIN_PASSWORD in your .env file",
      );
    }

    const existingAdmin = await Admin.findOne({
      username: username.trim(),
    });

    if (existingAdmin) {
      console.log("This admin username already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await Admin.create({
      username: username.trim(),
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin "${username}" created successfully.`);
  } catch (error) {
    console.error("Failed to create admin:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
