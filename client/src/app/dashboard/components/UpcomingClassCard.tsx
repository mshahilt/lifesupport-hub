import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LiveSession } from '@/types';
import Image from 'next/image';

type UpcomingClassCardProps = Omit<LiveSession, "endTime" | "status"> & {
    onStart: () => void;
    onSchedule: () => void;
};


export const UpcomingClassCard: React.FC<UpcomingClassCardProps> = ({
  title,
  description,
  image,
  onStart,
  onSchedule,
}) => {
  return (
  <Card>
  <div className="flex flex-col lg:flex-row h-80 overflow-hidden">
    
    <div className="w-full lg:w-1/2 lg:pr-6 lg:mb-0 mb-6 p-6 flex flex-col justify-center">
      <div className="text-base text-primary mb-2">Upcoming Live class</div>

      <h3 className="text-2xl font-medium text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-base mb-4 max-w-md">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <Button onClick={onStart} variant='primary' className="w-56 h-12">
          Start the class
        </Button>
        <Button
          onClick={onSchedule}
          variant="outline"
          className="w-56 h-12 text-primary"
        >
          Schedule the class
        </Button>
      </div>
    </div>

    <div className="w-full lg:w-1/2 flex items-end justify-end">
      <div className="h-full max-h-80">
        <Image
          src={image || "/assets/logo.png"}
          alt="Live Session"
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    </div>
    
  </div>
</Card>

  );
};