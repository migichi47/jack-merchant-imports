import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import api from "../services/api";
import { toast } from "react-toastify";

// types
export type PastImport = {
  _id: string;
  make: string;
  model: string;
  year: number;
  description?: string;
  imageUrl?: string;
  arrival?: Date;
};
export type ImportData = Omit<PastImport, "_id">;
export type Query = {
  _id: string;
  fullName: string;
  contact: string;
  email: string;
  status: string;
  budget?: string;
  description?: string;
  car: {
    make: string;
    model: string;
  };
  [key: string]: unknown;
};
export type Vehicle = {
  _id: string;
  make?: string;
  model?: string;
  year?: number;
  [key: string]: unknown;
};
export type Notification = {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  relatedQuery?: string;
  link?: string;
  [key: string]: unknown;
};
type AdminContextType = {
  pastImports: PastImport[];
  addImport: (importData: ImportData) => Promise<unknown>;
  deleteImport: (id: string) => Promise<void>;
  deleteQuery: (id: string) => Promise<void>;
  loadingDashboard: boolean;
  queries: Query[];
  setQueries: Dispatch<SetStateAction<Query[]>>;
  dashboardQueries: Query[];
  fetchNotifications: () => Promise<void>;
  fetchingNotifications: boolean;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  setUnreadCount: Dispatch<SetStateAction<number>>;
  unreadCount: number;
  availableMakesCount: number;
  vehicles: Vehicle[];
  setVehicles: Dispatch<SetStateAction<Vehicle[]>>;
};
export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

type AdminContextProviderProps = {
  children: ReactNode;
};

export function AdminContextProvider({ children }: AdminContextProviderProps) {
  const [pastImports, setPastImports] = useState<PastImport[]>([]);
  const [queries, setQueries] = useState<Query[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fetchingNotifications, setFetchingNotifications] =
    useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [availableMakes, setAvailableMakes] = useState({});
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
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

    const fetchVehicles = async () => {
      try {
        setLoadingDashboard(true);
        const response = await api.get("/api/vehicles/all");
        setVehicles(response.data.vehicles);
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
    fetchVehicles();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, []);
  const addImport = async (importData: ImportData) => {
    const response = await api.post("/api/imports", importData);
    setPastImports((prev) => [...prev, response.data.import]);
    return response.data;
  };

  const deleteImport = async (id: string) => {
    if (!window.confirm(`Confirm delete import?`)) {
      return;
    }
    try {
      const response = await api.delete(`/api/imports/${id}`);
      setPastImports((prev) => prev.filter((item) => item._id !== id));
      toast.success(response.data.message);
    } catch (err: unknown) {
      toast.error("Could not delete import");
      console.error("Failed to delete import");
    }
  };

  const deleteQuery = async (id: string) => {
    if (!window.confirm(`Confirm delete query?`)) {
      return;
    }
    try {
      await api.delete(`/api/queries/${id}`);
      setQueries((prev) => prev.filter((query) => query._id !== id));
      toast.success("query deleted successfully");
    } catch (err: unknown) {
      toast.error("Could not delete query");
      console.error("Failed to delete query");
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
        vehicles,
        setVehicles,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext(): AdminContextType {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdminContext must be used within an AdminContextProvider",
    );
  }

  return context;
}
