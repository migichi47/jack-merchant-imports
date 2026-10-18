import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";
import { Loader } from "lucide-react";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    let active = true;

    api
      .get("/api/auth/me")
      .then(() => {
        if (active) setAuthenticated(true);
      })
      .catch(() => {
        if (active) setAuthenticated(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (authenticated === null) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <span>
          <Loader className="animate-spin text-pink-500 w-10 h-10" />
        </span>
        Checking authentication...
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
