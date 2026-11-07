import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarProvider } from "./context/CarContext.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <CarProvider>
        <App />
      </CarProvider>
    </BrowserRouter>
  </StrictMode>,
);
