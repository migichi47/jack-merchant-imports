import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-300">
        <Sidebar />
      </aside>

      {/* Fixed topbar, starting after the sidebar */}
      <header className="fixed left-64 right-0 top-0 z-40 h-16 bg-white shadow-sm">
        <Topbar />
      </header>

      {/* Main content: offset from sidebar and topbar */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
