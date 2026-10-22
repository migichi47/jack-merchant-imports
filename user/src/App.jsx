import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import OurServicesPage from "./pages/OurServicesPage";
import QueryPage from "./pages/QueryPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ContacUsPage from "./pages/ContacUsPage";

function App() {
  return (
    <Routes>
      {/* <Route element={<Layout />}> */}
      <Route element={<LandingPage />} path="/" />
      <Route path="/services" element={<OurServicesPage />} />
      <Route path="/query" element={<QueryPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/contact-us" element={<ContacUsPage />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
