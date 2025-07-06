'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LiveSessionGrid } from './components/LiveSessionGrid';
import { CreateLiveModal } from './components/CreateLiveModal';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function LivePage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const liveSessions = [
    {
      id: '1',
      title: 'Basic Life Safety Support - 01',
      instructor: 'Manmadhan Naras',
      startTime: '10:00AM',
      status: 'upcoming' as const,
    },
    {
      id: '2',
      title: 'Fire Safety Support - 05',
      instructor: 'Arsha anna',
      startTime: '10:00AM',
      status: 'upcoming' as const,
    },
    {
      id: '3',
      title: 'Basic Life Safety Support - 02',
      instructor: 'Janu Arsha',
      startTime: '10:00AM',
      status: 'upcoming' as const,
    },
    {
      id: '4',
      title: 'Basic Life Safety Support - 02',
      instructor: 'Janu Arsha',
      startTime: '10:00AM',
      status: 'upcoming' as const,
    },
    {
      id: '5',
      title: 'Basic Life Safety Support - 02',
      instructor: 'Janu Arsha',
      startTime: '10:00AM',
      status: 'upcoming' as const,
    },
  ];

  const handleCreateLive = (data: any) => {
    console.log('Creating live session:', data);
    // Handle create live session logic here
  };

  const handleStartSession = (id: string) => {
    console.log('Starting session:', id);
    // Handle start session logic here
  };

  return (
    <DashboardLayout title="Start Live">
      <div className="space-y-6">
        {/* <div className="flex justify-end">
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Create New Live +
          </Button>
        </div> */}

        <LiveSessionGrid 
          sessions={liveSessions}
          onStartSession={handleStartSession}
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