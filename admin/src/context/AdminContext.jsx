import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [pastImports, setPastImports] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const dashboardQueries = queries.slice(0, 3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingDashboard(true);

        const importsResponse = await api.get("/api/imports");
        setPastImports(importsResponse.data);
        const queriesResponse = await api.get("/api/queries");
        setQueries(queriesResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDashboard(false);
      }
    };
    fetchData();
  }, []);

  const addImport = async (importData) => {
    const response = await api.post("/api/imports", importData);
    setPastImports((prev) => [...prev, response.data.import]);
    return response.data;
  };

  const deleteImport = async (id) => {
    if (!window.confirm(`Confirm delete import?`)) {
      return;
    }
    try {
      const response = await api.delete(`/api/imports/${id}`);
      setPastImports((prev) => prev.filter((item) => item._id !== id));
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete import");
    }
  };

  const deleteQuery = async (id) => {
    if (!window.confirm(`Confirm delete query?`)) {
      return;
    }
    try {
      await api.delete(`/api/queries/${id}`);
      setQueries((prev) => prev.filter((query) => query._id !== id));
      toast.success("query deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete query");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        pastImports,
        addImport,
        deleteImport,
        deleteQuery,
        loadingDashboard,
        queries,
        setQueries,
        dashboardQueries,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
