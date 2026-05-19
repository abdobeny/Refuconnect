import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import UserLayout from './components/layout/UserLayout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/public/Home';
import Animals from './pages/public/Animals';
import AnimalDetail from './pages/public/AnimalDetail';
import Grooming from './pages/public/Grooming';
import Couplage from './pages/public/Couplage';
import Dons from './pages/public/Dons';
import Volunteer from './pages/public/Bénévolat';
import AdminRedirect from './pages/admin/AdminRedirect';
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import MentionsLegales from './pages/public/MentionsLegales';
import CGU from './pages/public/CGU';
import PolitiqueConfidentialite from './pages/public/PolitiqueConfidentialite';
import NotFound from './pages/public/NotFound';

const AdminGate = ({ children }) => {
  const { user } = useAuth();
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/animaux" element={<Animals />} />
          <Route path="/animaux/:id" element={<AnimalDetail />} />
          <Route path="/toilettage" element={<Grooming />} />
          <Route path="/couplage" element={<Couplage />} />
          <Route path="/dons" element={<Dons />} />
          <Route path="/bénévolat" element={<Volunteer />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        </Route>

        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/user"
            element={
              <AdminGate>
                <UserDashboard />
              </AdminGate>
            }
          />
          <Route
            path="/user/profile"
            element={
              <AdminGate>
                <UserProfile />
              </AdminGate>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRedirect />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
