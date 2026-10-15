import mongoose from "mongoose";

const importSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["completed", "in-transit"],
      default: "completed",
    },

    arrival: {
      type: Date,
    },
  },
);

const Import = mongoose.model("PastImport", importSchema);

export default Import;
