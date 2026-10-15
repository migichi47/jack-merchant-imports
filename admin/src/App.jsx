import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Queries from "./pages/Queries";
import QueryDetails from "./pages/QueryDetails";
import PastImports from "./pages/PastImports";
import AddImport from "./pages/AddImport";
import EditImport from "./pages/EditImport";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/queries" element={<Queries />} />
        <Route path="/queries/:id" element={<QueryDetails />} />
        <Route path="/past-imports" element={<PastImports />} />
        <Route path="/past-imports/new" element={<AddImport />} />
        <Route path="/past-imports/:id/edit" element={<EditImport />} />
        <Route path="/settings" element={<EditImport />} />
      </Route>
    </Routes>
  );
};

export default App;
