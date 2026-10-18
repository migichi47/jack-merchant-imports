export const updateSetting = (setSettings, section, key, value) => {
  setSettings((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value,
    },
  }));
};
