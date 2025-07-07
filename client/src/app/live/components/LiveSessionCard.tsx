import React, { useState } from 'react';
import { LiveSession } from '@/types';

type LiveSessionCardProps = Omit<LiveSession, 'endTime'> & {
  onStart?: () => void;
  updateStatus: (sessionId: string, status: "upcoming" | "live" | "completed") => void;
};

export const LiveSessionCard: React.FC<LiveSessionCardProps> = ({
  _id,
  title,
  instructor,
  startTime,
  status,
  image,
  onStart,
  updateStatus
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'live':
        return 'bg-red-500';
      case 'upcoming':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleStatusChange = (newStatus: "upcoming" | "live" | "completed") => {
    updateStatus(_id, newStatus);
    setShowTooltip(false);
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div
      className="relative w-full aspect-video rounded-3xl overflow-hidden bg-center bg-cover group shadow-md"
      style={{
        backgroundImage: `url(${image || '/assets/images/doctor.jpg'})`,
      }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm transition-all duration-300 group-hover:backdrop-blur-none" />

      <div className="absolute top-3 right-3 z-20">
        <div className="relative">
          <button 
            className="p-1 bg-transparent rounded-full cursor-pointer"
            onClick={toggleTooltip}
          >
            <img src="/assets/icons/link.svg" alt="Link" />
          </button>
          
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border p-2 min-w-[120px] z-[9999]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-500">Update Status:</div>
                <button
                  onClick={() => setShowTooltip(false)}
                  className="text-gray-400 hover:text-gray-600 text-sm font-bold"
                >
                  ×
                </button>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => handleStatusChange('upcoming')}
                  className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 ${
                    status === 'upcoming' ? 'bg-yellow-50 text-yellow-700' : 'text-gray-700'
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => handleStatusChange('live')}
                  className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 ${
                    status === 'live' ? 'bg-red-50 text-red-700' : 'text-gray-700'
                  }`}
                >
                  Live
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 ${
                    status === 'completed' ? 'bg-green-50 text-green-700' : 'text-gray-700'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-primary mb-1">{title}</h3>
        <p className="text-sm text-gray-700">
          Instructor: <span className="font-medium">{instructor}</span>
        </p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-gray-600">Joined: 0</span>

          {status === 'upcoming' && (
            <button
              onClick={onStart}
              className="text-sm text-primary font-semibold hover:underline cursor-pointer"
            >
              Start Live
            </button>
          )}

          {status === 'live' && (
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              Live Now
            </span>
          )}

          {status === 'completed' && (
            <span className="text-sm font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
              Completed
            </span>
          )}
        </div>

      </div>
    </div>
  );
};