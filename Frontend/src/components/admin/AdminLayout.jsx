import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#3d3d3d]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-[#201e1e]">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;