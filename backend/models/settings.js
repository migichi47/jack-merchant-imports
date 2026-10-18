import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    default: "general",
    unique: true,
    required: true,
  },

  emails: {
    queryConfirmation: { type: Boolean, default: true },
    statusUpdates: { type: Boolean, default: true },
    importCompletion: { type: Boolean, default: false },
    newQueryAlerts: { type: Boolean, default: true },
    failedEmailAlerts: { type: Boolean, default: true },
  },

  queries: {
    followUpReminders: { type: Boolean, default: false },
    followUpDays: { type: Number, default: 3, min: 1, max: 365 },
    requireCancellationReason: { type: Boolean, default: true },
  },

  business: {
    name: {
      type: String,
      default: "Jack Merchants Imports",
      trim: true,
    },
    contactEmail: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    whatsapp: { type: String, default: "", trim: true },
    signature: {
      type: String,
      default:
        "Thank you,\nJack Merchants Imports\nYour trusted vehicle import partner.",
    },
  },
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
