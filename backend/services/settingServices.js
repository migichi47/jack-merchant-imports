import Settings from "../models/settings.js";


export const getGeneralSettings = async () => {
  let settings = await Settings.findOne({ key: "general" });

  if (!settings) {
    settings = await Settings.create({ key: "general" });
  }

  return settings;
};
