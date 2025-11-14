import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  RiDashboardLine,
  RiCalendarLine,
  RiTableLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiTimeLine,
  RiSnowyLine,
  RiCouponLine
} from 'react-icons/ri';
import { useState } from 'react';

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const menuItems = [
    { path: '/admin', icon: RiDashboardLine, label: 'Dashboard' },
    { path: '/admin/reservations', icon: RiCalendarLine, label: 'Reservations' },
    { path: '/admin/offers', icon: RiCouponLine, label: 'Offers' }, // Using better icon
    { path: '/admin/tables', icon: RiTableLine, label: 'Tables' },
    { path: '/admin/frozen', icon: RiSnowyLine, label: 'Frozen' },
    { path: '/admin/timing', icon: RiTimeLine, label: 'Time Slots' },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className={`fixed inset-0 md:static bg-gray-900 h-full p-6 transition-all duration-300 ${
        isSidebarExpanded ? 'w-64' : 'w-20'
      } border-r border-gray-700`}
    >
      <div className="flex justify-between items-center mb-8">
        {isSidebarExpanded && (
          <h1 className="text-xl font-bold text-[#D8AB3E]">
            Admin Panel
          </h1>
        )}

        <button
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="text-gray-400 hover:text-[#D8AB3E] transition"
        >
          <RiMenuLine className="text-xl" />
        </button>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              location.pathname === item.path
                ? 'bg-[#D8AB3E]/20 text-[#D8AB3E]'
                : 'text-gray-400 hover:bg-[#D8AB3E]/10 hover:text-[#D8AB3E]'
            }`}
          >
            <item.icon className="text-xl min-w-5" />
            {isSidebarExpanded && (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition text-gray-400 hover:bg-red-500/10 hover:text-red-500 ${
            !isSidebarExpanded ? 'justify-center' : ''
          }`}
        >
          <RiLogoutBoxLine className="text-xl" />
          {isSidebarExpanded && <span>Logout</span>}
        </button>
      </nav>
    </motion.div>
  );
}

export default AdminSidebar;
