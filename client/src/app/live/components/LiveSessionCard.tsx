import React from 'react';
import { LiveSession } from '@/types';

type LiveSessionCardProps = Omit<LiveSession, "endTime"> & {
  onStart?: () => void;
}

export const LiveSessionCard: React.FC<LiveSessionCardProps> = ({
  id,
  title,
  instructor,
  startTime,
  status,
  image,
  onStart,
}) => {
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
return (
 <div className="relative w-full aspect-video rounded-4xl overflow-hidden bg-cover bg-center bg-[url('/assets/images/doctor.jpg')]">
  
  <div className="absolute top-3 right-3 z-10">
    <button className="p-1 bg-transparent bg-opacity-80 rounded-full hover:bg-opacity-100 transition">
      <img src="/assets/icons/link.svg" alt="Link" />
    </button>
  </div>

  <div className="absolute bottom-3 left-3 right-3 bg-white rounded-3xl shadow-md py-3 px-6 z-10">
    
    <h3 className="text-lg font-medium text-blue-600 mb-1">
      {title}
    </h3>
    <p className="text-sm text-gray-700">
      Instructors: <span className="font-medium">{instructor}</span>
    </p>

    <div className="flex items-center justify-between">

      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-700">Joined peoples: 0</p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onStart}
          className="text-sm text-primary font-semibold  hover:underline"
        >
          Start Live
        </button>
      </div>
    </div>
  </div>

  {/* Blur background */}
  <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
</div>


);
};
