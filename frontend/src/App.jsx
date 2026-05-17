import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import UserLayout from './components/layout/UserLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/public/Home';
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
};

export default App;
