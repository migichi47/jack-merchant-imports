import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, // Store a bcrypt hash, never plain text
  },
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
});

export default mongoose.model("Admin", adminSchema);
