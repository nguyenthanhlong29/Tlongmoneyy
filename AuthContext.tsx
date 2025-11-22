'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/auth';
import { storage } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isAuthenticated: false,
  });

  const checkAuth = () => {
    const token = storage.getStoredToken();
    const user = storage.getStoredUser();
    
    if (token && user) {
      setAuthState({
        token,
        user,
        isAuthenticated: true,
      });
    }
  };

  const login = (token: string, user: User) => {
    storage.storeToken(token);
    storage.storeUser(user);
    setAuthState({
      token,
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    storage.clearAll();
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isAuthenticated: authState.isAuthenticated,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
