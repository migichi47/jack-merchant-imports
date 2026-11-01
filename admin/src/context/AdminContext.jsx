import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const [pastImports, setPastImports] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [fetchingNotifications, setFetchingNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [availableMakes, setAvailableMakes] = useState({});
  const dashboardQueries = queries.slice(0, 3);
  const availableMakesCount = Object.keys(availableMakes).length;

  const fetchNotifications = async () => {
    try {
      setFetchingNotifications(true);
      const response = await api.get("/api/notifications");

      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setFetchingNotifications(false);
    }
  };

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

    const fetchAvailableMakes = async () => {
      setLoadingDashboard(true);
      try {
        const response = await api.get("/api/vehicles/available-makes");
        setAvailableMakes(response.data.availableMakes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchData();
    fetchAvailableMakes();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
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
        fetchNotifications,
        fetchingNotifications,
        notifications,
        setNotifications,
        setUnreadCount,
        unreadCount,
        availableMakesCount,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
