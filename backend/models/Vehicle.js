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
    },

    price_usd: {
      type: Number,
      required: true,
      min: 0,
    },

    mileage: {
      type: Number,
      min: 0,
      default: null,
    },

    fuel_type: {
      type: String,
      enum: [
        "gasoline",
        "diesel",
        "hybrid",
        "plug-in-hybrid",
        "electric",
        "lpg",
        "other",
      ],
      default: "other",
    },

    transmission: {
      type: String,
      enum: ["auto", "manual", "cvt", "other"],
      default: "other",
    },

    body_type: {
      type: String,
      enum: [
        "sedan",
        "suv",
        "hatchback",
        "wagon",
        "coupe",
        "van",
        "pickup",
        "minivan",
        "convertible",
        "other",
      ],
      default: "other",
    },

    color: {
      type: String,
      trim: true,
      default: "",
    },

    thumbUrl: {
      type: String,
      required: true,
      trim: true,
    },

    photos: {
      type: [String],
      default: [],
    },

    engine_capacity: {
      type: Number,
      min: 0,
      default: null,
    },

    drive_type: {
      type: String,
      enum: ["FWD", "RWD", "AWD", "4WD", "other"],
      default: "other",
    },

    source: {
      type: String,
      enum: ["admin", "system"],
      default: "admin",
      required: true,
    },
    carapisId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
