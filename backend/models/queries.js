import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    budget: {
      type: String,
    },

    description: {
      type: String,
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "replied", "inprogress"],
    },
    car: {
      make: {
        type: String,
        required: true,
      },

      model: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Queries", querySchema);
