import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import "react-toastify/dist/ReactToastify.css";
import VehicleDetails from "./pages/VehicleDetails";
import Layout from "./layouts/Layout.js";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<LandingPage />} path="/" />
          <Route element={<VehicleDetails />} path="/vehicles/:id" />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
