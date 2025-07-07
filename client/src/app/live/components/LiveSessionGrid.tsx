import React from 'react';
import { LiveSessionCard } from './LiveSessionCard';
import { LiveSession } from '@/types';
import useLive from '@/hooks/useLive';

interface LiveSessionGridProps {
  sessions: LiveSession[];
  onStartSession?: (id: string) => void;
  onAddSession?: () => void;
}

export const LiveSessionGrid: React.FC<LiveSessionGridProps> = ({
  sessions,
  onStartSession,
  onAddSession,
}) => {
  const {updateStatus} = useLive();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <LiveSessionCard
        updateStatus={updateStatus}
          key={session.title}
          {...session}
          onStart={() => onStartSession?.(session._id)}
        />
      ))}

      <div className="w-full aspect-video rounded-2xl flex items-center justify-center bg-gray-100">
        <p onClick={onAddSession} className='text-primary font-medium text-lg hover:underline cursor-pointer'>Create New Live +</p>
      </div>
    </div>
  );
};
