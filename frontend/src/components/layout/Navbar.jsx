import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { PawPrint, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="w-full bg-background-paper py-3 px-4 md:px-6 lg:px-8 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <div className="relative">
            <PawPrint className="w-7 h-7 md:w-8 md:h-8 text-primary transform group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 flex gap-0.5">
              <span className="w-1 h-1 bg-secondary rounded-full"></span>
              <span className="w-1 h-1 bg-primary rounded-full"></span>
              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
            </div>
          </div>
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight">Refu<span className="text-primary">Connect</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-primary font-medium text-sm">Accueil</Link>
          <Link to="/animaux" className="text-text-main hover:text-primary transition-colors text-sm">Animaux</Link>
          <Link to="/toilettage" className="text-text-main hover:text-primary transition-colors text-sm">Toilettage</Link>
          <Link to="/couplage" className="text-text-main hover:text-primary transition-colors text-sm">Couplage</Link>
          <Link to="/dons" className="text-text-main hover:text-primary transition-colors text-sm">Dons</Link>
          <Link to="/bénévolat" className="text-text-main hover:text-primary transition-colors text-sm">Bénévolat</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="text-primary font-medium text-sm">Admin</Link>}
              {user.role === 'user' && <Link to="/user" className="text-primary font-medium text-sm">Mon espace</Link>}
              <button onClick={handleLogout} className="text-sm text-text-main hover:text-primary transition-colors font-medium">Déconnexion</button>
            </>
          ) : (
            <Button variant="white" className="shadow-md border border-gray-100 text-sm px-3 py-2" onClick={() => navigate('/connexion')}>Connexion</Button>
          )}
        </div>

        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6 text-text-main" /> : <Menu className="w-6 h-6 text-text-main" />}
        </button>
      </div>

      {isOpen && (
      <div className="md:hidden animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="bg-white border-t border-gray-200 px-4 pb-4 pt-3 space-y-1">
          <Link to="/" onClick={() => handleNavigate('/')} className="block px-2 py-2 text-primary font-medium rounded-md hover:bg-gray-50">Accueil</Link>
          <Link to="/animaux" onClick={() => handleNavigate('/animaux')} className="block px-2 py-2 text-text-main rounded-md hover:bg-gray-50">Animaux</Link>
          <Link to="/toilettage" onClick={() => handleNavigate('/toilettage')} className="block px-2 py-2 text-text-main rounded-md hover:bg-gray-50">Toilettage</Link>
          <Link to="/couplage" onClick={() => handleNavigate('/couplage')} className="block px-2 py-2 text-text-main rounded-md hover:bg-gray-50">Couplage</Link>
          <Link to="/dons" onClick={() => handleNavigate('/dons')} className="block px-2 py-2 text-text-main rounded-md hover:bg-gray-50">Dons</Link>
          <Link to="/bénévolat" onClick={() => handleNavigate('/bénévolat')} className="block px-2 py-2 text-text-main rounded-md hover:bg-gray-50">Bénévolat</Link>

          <div className="border-t border-gray-100 my-2" />

          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" onClick={() => handleNavigate('/admin')} className="block px-2 py-2 text-primary font-medium rounded-md hover:bg-gray-50">Admin</Link>}
              {user.role === 'user' && <Link to="/user" onClick={() => handleNavigate('/user')} className="block px-2 py-2 text-primary font-medium rounded-md hover:bg-gray-50">Mon espace</Link>}
              <button onClick={handleLogout} className="w-full text-left px-2 py-2 text-text-main rounded-md hover:bg-gray-50 flex items-center gap-2"> <LogOut className="w-4 h-4" /> Déconnexion</button>
            </>
          ) : (
            <button onClick={() => handleNavigate('/connexion')} className="w-full text-left px-2 py-2 text-primary font-medium rounded-md hover:bg-gray-50">Connexion</button>
          )}
        </div>
      </div>
      )}
    </nav>
  );
};

export default Navbar;
