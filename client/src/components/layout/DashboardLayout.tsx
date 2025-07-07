'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuthStore } from '@/store/useAuthStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { user, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && !user) {
      router.push('/auth/login');
    }
  }, [hasHydrated, user, router]);

  if (!hasHydrated || !user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={title}
          user={user ?? { name: 'Guest' }}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
