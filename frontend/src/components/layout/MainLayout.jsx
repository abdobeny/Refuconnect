import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children, className = '' }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const mainSpacing = isHome ? 'py-0' : 'py-8 md:py-10';

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text-main">
      <Navbar />
      <main className={`flex-grow max-w-7xl mx-auto w-full px-4 md:px-6 ${mainSpacing} ${className}`}>
        {/* If `children` are provided directly, render them, otherwise render the router Outlet */}
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
