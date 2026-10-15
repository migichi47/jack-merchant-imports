import { createContext, useEffect, useState } from "react";
import api from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [pastImports, setPastImports] = useState([]);
  console.log(pastImports);

  useEffect(() => {
    const fetchImports = async () => {
      const response = await api.get("/api/imports");
      setPastImports(response.data);
    };
    fetchImports();
  }, []);

  const addImport = async (importData) => {
    const response = await api.post("/api/imports", importData);
    setPastImports((prev) => [...prev, response.data.import]);
    return response.data;
  };

  return (
    <AdminContext.Provider
      value={{
        pastImports,
        addImport,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
