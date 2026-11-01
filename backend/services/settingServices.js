import Settings from "../models/settings.js";

export const getGeneralSettings = async () => {
  let settings = await Settings.findOne({ key: "general" });

  if (!settings) {
    settings = await Settings.create({ key: "general" });
  }

  return settings;
};

export const getDefaultSettings = () => {
  return {
    key: "general",
    emails: {
      queryConfirmation: true,
      statusUpdates: true,
      importCompletion: false,
      newQueryAlerts: true,
      failedEmailAlerts: true,
    },
    queries: {
      followUpReminders: false,
      followUpDays: 3,
      requireCancellationReason: true,
    },
    business: {
      name: "Jack Merchants Imports",
      contactEmail: "",
      phone: "",
      whatsapp: "",
      signature:
        "Thank you,\nJack Merchants Imports\nYour trusted vehicle import partner.",
    },
  };
};
