import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { PawPrint, Menu, X, LogOut, ChevronDown, Heart, Home, Dog, Scissors, HandHeart, Gift, Users } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/animaux', label: 'Animaux', icon: Dog },
    { path: '/toilettage', label: 'Toilettage', icon: Scissors },
    { path: '/couplage', label: 'Couplage', icon: HandHeart },
    { path: '/dons', label: 'Dons', icon: Gift },
    { path: '/bénévolat', label: 'Bénévolat', icon: Users },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="relative group flex items-center gap-2.5"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <PawPrint className="relative w-7 h-7 lg:w-8 lg:h-8 text-primary transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </div>
              <div className="flex items-baseline">
                <span className="font-serif text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Refu
                </span>
                <span className="font-serif text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  Connect
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative group px-4 py-2 rounded-xl transition-all duration-300 ${
                      active 
                        ? 'text-primary bg-primary/5' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        active ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                      }`} />
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                    {active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full mx-4"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center text-sm font-semibold shadow-md">
                      {user.email?.[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden lg:block">
                      {user.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      activeDropdown === 'user' ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {activeDropdown === 'user' && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Connecté en tant que</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Administration
                        </Link>
                      )}
                      {user.role === 'user' && (
                        <Link
                          to="/user"
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          Mon espace
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button 
                  variant="primary" 
                  className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 px-5 py-2.5 rounded-xl text-sm font-semibold"
                  onClick={() => navigate('/connexion')}
                >
                  Connexion
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)} 
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-0 group-hover:opacity-100"></div>
              {isOpen ? 
                <X className="relative w-5 h-5 text-gray-600" /> : 
                <Menu className="relative w-5 h-5 text-gray-600" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => handleNavigate(link.path)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        active 
                          ? 'bg-primary/5 text-primary' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-gray-400'}`} />
                      <span className="font-medium">{link.label}</span>
                      {active && (
                        <div className="ml-auto w-1 h-6 bg-primary rounded-full"></div>
                      )}
                    </Link>
                  );
                })}

                <div className="h-px bg-gray-100 my-3" />

                {user ? (
                  <>
                    <div className="px-4 py-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center text-sm font-semibold">
                          {user.email?.[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.email}</p>
                          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => handleNavigate('/admin')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                      >
                        <Heart className="w-5 h-5 text-primary" />
                        <span>Administration</span>
                      </Link>
                    )}
                    {user.role === 'user' && (
                      <Link
                        to="/user"
                        onClick={() => handleNavigate('/user')}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50"
                      >
                        <Users className="w-5 h-5 text-primary" />
                        <span>Mon espace</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Déconnexion</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigate('/connexion')}
                    className="w-full mt-2 bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                  >
                    Connexion
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;