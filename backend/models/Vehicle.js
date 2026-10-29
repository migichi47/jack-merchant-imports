import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
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
      min: 1900,
    },

    price_usd: {
      type: Number,
      min: 0,
    },

    mileage: {
      type: Number,
      min: 0,
    },

    fuel_type: {
      type: String,
      trim: true,
      required: true,
    },

    transmission: {
      type: String,
      trim: true,
      required: true,
    },

    body_type: {
      type: String,
      trim: true,
      required: true,
    },

    color: {
      type: String,
      trim: true,
      required: true,
    },

    // Images hosted independently of CarApis
    thumbUrl: {
      type: String,
      required: true,
    },

    photos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Vehicle", vehicleSchema);
