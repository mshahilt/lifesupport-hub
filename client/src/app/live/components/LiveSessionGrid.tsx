import React from 'react';
import { LiveSessionCard } from './LiveSessionCard';

interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'completed';
  image?: string;
}

interface LiveSessionGridProps {
  sessions: LiveSession[];
  onStartSession?: (id: string) => void;
}

export const LiveSessionGrid: React.FC<LiveSessionGridProps> = ({
  sessions,
  onStartSession,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <LiveSessionCard
          key={session.id}
          {...session}
          onStart={() => onStartSession?.(session.id)}
        />
      ))}
    </div>
  );
};