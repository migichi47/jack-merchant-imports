import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import OurServicesPage from "./pages/OurServicesPage";
import QueryPage from "./pages/QueryPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<LandingPage />} path="/" />
        <Route path="/services" element={<OurServicesPage />} />
        <Route path="/query" element={<QueryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
