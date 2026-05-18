import React, { createContext, useState, useEffect, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistAuth = useCallback((authToken, authUser) => {
    setToken(authToken);
    setUser(authUser);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(authUser));
  }, []);

  const clearAuth = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('user');
        }
      }

      try {
        const { data } = await axiosClient.get('/user');
        const freshUser = data.data ?? data;
        persistAuth(storedToken, freshUser);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [clearAuth, persistAuth]);

  const login = async (email, password) => {
    const { data } = await axiosClient.post('/login', { email, password });
    persistAuth(data.token, data.user);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await axiosClient.post('/register', payload);
    persistAuth(data.token, data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      if (token) {
        await axiosClient.post('/logout');
      }
    } catch {
      // ignore — session may already be invalid
    } finally {
      clearAuth();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
