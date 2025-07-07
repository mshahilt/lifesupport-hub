'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LiveSessionGrid } from './components/LiveSessionGrid';
import { CreateLiveModal } from './components/CreateLiveModal';
import useLive from '@/hooks/useLive';

export default function LivePage() {

    const {liveSessions,fetchLives, loading, error, addLiveSession} = useLive();
    const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateLive = (data: any) => {
    console.log("live data from page", data);
    addLiveSession(data);
  };

  const handleAddSession = () => {
    setShowCreateModal(!showCreateModal);
  }

  const handleStartSession = (id: string) => {
    console.log('Starting session:', id);
  };

  return (
    <DashboardLayout title="Start Live">
      <div className="space-y-6">

        <LiveSessionGrid 
          sessions={liveSessions}
          onStartSession={handleStartSession}
          onAddSession={handleAddSession}
        />

        <CreateLiveModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateLive}
        />
      </div>
    </DashboardLayout>
  );
}