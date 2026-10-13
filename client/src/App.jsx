import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";
import ImportPage from "./pages/ImportPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<LandingPage />} path="/" />
        <Route element={<ImportPage />} path="/import" />
      </Route>
    </Routes>
  );
}

export default App;
