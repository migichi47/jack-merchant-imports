import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<LandingPage />} path="/" />
      </Route>
    </Routes>
  );
}

export default App;
