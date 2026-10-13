import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<LandingPage />} path="/" />
        <Route element={<CarDetails />} path="/details/:id" />
      </Route>
    </Routes>
  );
}

export default App;
