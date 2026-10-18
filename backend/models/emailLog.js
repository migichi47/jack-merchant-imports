import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    queryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Query",
      default: null,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["manual", "query_confirmation", "status_update"],
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "failed"],
      required: true,
    },
    providerId: String,
    error: String,
  },
  { timestamps: true },
);

export default mongoose.model("EmailLog", emailLogSchema);
