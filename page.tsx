'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { TaskProvider } from '@/contexts/TaskContext';
import LoginPage from '@/components/LoginPage';
import Dashboard from '@/components/Dashboard';

function HomeContent() {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    // Handle OAuth callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userStr = params.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        login(token, user);
        // Clean up URL
        window.history.replaceState({}, '', '/');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [login]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Dashboard />;
}

export default function Home() {
  return (
    <AuthProvider>
      <TaskProvider>
        <HomeContent />
      </TaskProvider>
    </AuthProvider>
  );
}
