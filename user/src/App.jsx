import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LandingPage />} path="/" />
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
