import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';
import { CalendarCheck, HeartHandshake, LayoutDashboard, Menu, Settings, UserRound, X } from 'lucide-react';

const UserLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { label: 'Tableau de bord', path: '/user', icon: LayoutDashboard },
    { label: 'Mon profil', path: '/user/profile', icon: UserRound },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F6F2EC] text-text-main">
      <Navbar />
      <div className="flex flex-1">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-primary p-3 text-white shadow-lg transition-colors hover:bg-primary-hover md:hidden"
          aria-label="Ouvrir le menu de l'espace membre"
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
                {(user?.name || user?.email || 'U')[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user?.name || 'Espace membre'}</p>
                <p className="truncate text-xs text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/user'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-light text-primary'
                        : 'text-text-light hover:bg-primary-light/60 hover:text-primary'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-primary/10 bg-[#FBFAF7] p-4">
            <div className="flex items-center gap-3 text-primary">
              <CalendarCheck className="h-5 w-5" />
              <p className="text-sm font-semibold">Suivi refuge</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              Retrouvez vos adoptions, dons et rendez-vous dans un seul espace.
            </p>
          </div>

          <div className="mt-auto space-y-3 border-t border-primary/10 pt-5">
            <div className="flex items-center gap-2 text-xs text-muted">
              <HeartHandshake className="h-4 w-4 text-accent" />
              contact@refuconnect.fr
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Settings className="h-4 w-4 text-accent" />
              Espace membre
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
