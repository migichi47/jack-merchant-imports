import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-300
        sidebar-animate md:block ${showSidebar ? "" : "hidden"}`}
      >
        <Sidebar setShowSidebar={setShowSidebar} />
      </aside>

      {/* Fixed topbar, starting after the sidebar */}
      <header className="fixed left-0 md:left-64 right-0 top-0 z-40 h-16 bg-white shadow-sm">
        <Topbar setShowSidebar={setShowSidebar} />
      </header>

      {/* Main content: offset from sidebar and topbar */}
      <main className="md:ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
