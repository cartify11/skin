import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('aura_admin_token'));
  const [user, setUser] = useState<AdminUser | null>(
    localStorage.getItem('aura_admin_user')
      ? JSON.parse(localStorage.getItem('aura_admin_user')!)
      : null
  );

  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem('aura_admin_token', token);
    } else {
      localStorage.removeItem('aura_admin_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aura_admin_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aura_admin_user');
    }
  }, [user]);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('aura_admin_token');
    localStorage.removeItem('aura_admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
