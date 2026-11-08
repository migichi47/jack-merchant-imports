import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../services/api";
import { Loader } from "lucide-react";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState<boolean | undefined>();

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then(() => {
        console.log("Setting authenticated to true");
        setAuthenticated(true);
      })
      .catch((error) => {
        console.log("Setting authenticated to false", error);
        setAuthenticated(false);
      });
  }, []);

  console.log("Current authentication state:", authenticated);

  if (authenticated === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader className="animate-spin text-pink-500 w-10 h-10" />
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;