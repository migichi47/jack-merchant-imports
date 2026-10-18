import api from "./api";

export const getSettings = async () => {
  const response = await api.get("/api/settings");
  return response.data;
};

export const updateSettings = async (settings) => {
  const response = await api.patch("/api/settings", settings);
  return response.data;
};

export const updateSetting = (setSettings, section, key, value) => {
  setSettings((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value,
    },
  }));
};
