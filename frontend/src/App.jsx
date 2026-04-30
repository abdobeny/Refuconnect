import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAnimals } from './context/AnimalsContext';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Button from './components/ui/Button';
import AnimalGrid from './components/features/animals/AnimalGrid';
import Animals from './pages/public/Animals';
import AnimalDetail from './pages/public/AnimalDetail';
import Grooming from './pages/public/Grooming';
import Couplage from './pages/public/Couplage';
import Dons from './pages/public/Dons';
import Volunteer from './pages/public/Bénévolat';
import Dashboard from './pages/admin/Dashboard';
import ManageAnimals from './pages/admin/ManageAnimals';
import Adoptions from './pages/admin/Adoptions';
import Toilettage from './pages/admin/Toilettage';
import CouplageAdmin from './pages/admin/Couplage';
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import Login from './pages/public/Login';

// Home Page with AnimalGrid wired for visual testing
const Home = () => {
  const navigate = useNavigate();
  const { animals } = useAnimals();

  const handleView = (id) => {
    navigate(`/animaux/${id}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="w-full flex items-center bg-cover bg-center py-32" style={{ backgroundImage: 'url(/dog1.jpg)' }}>
        <div className="flex w-full items-center justify-center px-0">
          <div className="flex flex-col justify-center w-full max-w-screen-xl mx-auto px-20">
            <h1 className="text-7xl font-extrabold mb-10 text-white drop-shadow-2xl">Bienvenue sur Refuconnect</h1>
            <p className="text-3xl mb-12 text-white drop-shadow-2xl">Adoptez un animal, changez une vie.</p>
            <div className="flex gap-8">
              <Button variant="primary" size="lg" onClick={() => navigate('/animaux')}>Voir les animaux</Button>
              <Button variant="white" size="lg" className="border border-gray-200" onClick={() => navigate('/dons')}>Faire un don</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animals Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos animaux à adopter</h2>
        <AnimalGrid animals={animals} onView={handleView} />
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/animaux" element={<Animals />} />
          <Route path="/animaux/:id" element={<AnimalDetail />} />
          <Route path="/toilettage" element={<Grooming />} />
          <Route path="/couplage" element={<Couplage />} />
          <Route path="/dons" element={<Dons />} />
          <Route path="/bénévolat" element={<Volunteer />} />
        </Route>

        {/* Auth Route - Standalone */}
        <Route path="/connexion" element={<Login />} />

        {/* Protected User Routes */}
        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>

        {/* Protected Admin Routes - Only for admins */}
        <Route
          element={
            <ProtectedRoute>
              <AdminProtectedWrapper>
                <AdminLayout />
              </AdminProtectedWrapper>
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/animaux" element={<ManageAnimals />} />
          <Route path="/admin/adoptions" element={<Adoptions />} />
          <Route path="/admin/toilettage" element={<Toilettage />} />
          <Route path="/admin/couplage" element={<CouplageAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Admin-only route wrapper
const AdminProtectedWrapper = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;