import React, { useState } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import { Package, Menu, Settings, X, PawPrint, LogOut, MessageSquare } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { label: 'Gestion des animaux', path: '/admin', icon: PawPrint },
    { label: 'Gestion des témoignages', path: '/admin/testimonials', icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F2EC] text-text-main">
      <Navbar />
      <div className="flex flex-1">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-primary p-3 text-white shadow-lg transition-colors hover:bg-primary-hover md:hidden"
          aria-label="Ouvrir le menu administration"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <aside
          className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-primary/10 bg-white p-5 shadow-xl transition-transform duration-300 md:static md:shadow-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="rounded-2xl bg-primary p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-base font-bold">
                {(user?.name || user?.email || 'A')[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user?.name || 'Administration'}</p>
                <p className="truncate text-xs text-white/70 uppercase font-medium">Admin</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-1 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-text-light hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-primary/10 pt-4 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
