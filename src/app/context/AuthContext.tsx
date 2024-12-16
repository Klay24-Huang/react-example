'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login } from '@/app/repositories/authRepository';

interface AuthContextType {
  user: string | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    try {
      const userData = await login(email, password);
      setUser(userData?.user);
    } catch (error) {
      throw error
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
