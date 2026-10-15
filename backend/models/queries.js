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

    car: {
      make: {
        type: String,
        required: true,
      },

      model: {
        type: String,
        required: true,
      },

      year: {
        from: {
          type: Number,
          required: true,
        },
        to: {
          type: Number,
          required: true,
        },
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Queries", querySchema);
