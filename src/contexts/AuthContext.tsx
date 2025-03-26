
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getCurrentUser, logout as authLogout } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in when component mounts
    const user = getCurrentUser();
    setUser(user);
    setLoading(false);
  }, []);

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    localStorage.setItem('hms_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
