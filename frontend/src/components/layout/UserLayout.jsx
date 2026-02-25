import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import { Menu, X } from 'lucide-react';

const UserLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Tableau de bord', path: '/user' },
    { label: 'Mon profil', path: '/user/profile' },
    { label: 'Mes demandes', path: '/user' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-text-main">
      <Navbar />
      <div className="flex flex-1">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden fixed bottom-6 right-6 z-40 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 p-4 md:p-6 flex flex-col gap-6 transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div>
            <div className="font-serif text-lg md:text-xl font-bold text-primary">Mon Espace</div>
            <p className="text-xs md:text-sm text-muted mt-1">Connecté : {user?.email}</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="block p-2 md:p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <p className="text-xs text-muted mb-3">Visitor Account v1.0</p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 md:hidden z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-10 pt-20 md:pt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
