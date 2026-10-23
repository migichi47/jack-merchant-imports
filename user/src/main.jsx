import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { CarProvider } from "./context/CarContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <CarProvider> */}
        <App />
      {/* </CarProvider> */}
    </BrowserRouter>
  </StrictMode>,
);
