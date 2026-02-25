import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
};

export default ProtectedRoute;
