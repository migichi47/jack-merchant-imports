
import type { Dispatch, SetStateAction } from "react";
import api from "./api";

export const getSettings = async () => {
  const response = await api.get("/api/settings");
  return response.data;
};

export const updateSettings = async (settings: object) => {
  const response = await api.patch("/api/settings", settings);
  return response.data;
};

export const updateSetting = <
  T extends { [section: string]: object },
  S extends keyof T,
  K extends keyof T[S]
>(
  setSettings: Dispatch<SetStateAction<T>>,
  section: S,
  key: K,
  value?: T[S][K]
) => {
  setSettings((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value,
    },
  }));
};
