import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/admin">
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
