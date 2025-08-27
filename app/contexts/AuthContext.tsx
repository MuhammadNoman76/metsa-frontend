'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { User, UserRole } from '@/types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch {
        Cookies.remove('access_token');
      }
    }
    setIsLoading(false);
  };

  const login = async (username: string, password: string) => {
    // OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    Cookies.set('access_token', response.data.access_token, { expires: 1 });

    const userResponse = await api.get('/users/me');
    setUser(userResponse.data);

    // Redirect directly to documents page based on role
    toast.success('Logged in successfully');
    switch (userResponse.data.role) {
      case UserRole.ADMIN:
        router.push('/admin/documents');
        break;
      case UserRole.EDITOR:
        router.push('/editor/documents');
        break;
      case UserRole.CUSTOMER:
        router.push('/customer/documents');
        break;
    }
  };

  const logout = () => {
    Cookies.remove('access_token');
    setUser(null);
    toast.info('Logged out');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
