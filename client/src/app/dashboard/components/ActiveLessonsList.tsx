import React from 'react';
import { Card } from '@/components/ui/Card';
import { BookOpen, Stethoscope, Activity, Camera } from 'lucide-react';
import { ActiveLesson } from '@/types';
// interface ActiveLesson {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   color: string;
// }

interface ActiveLessonsListProps {
  lessons: ActiveLesson[];
}

const iconMap = {
  'pediatrics': BookOpen,
  'research': Stethoscope,
  'emergency': Activity,
  'radiology': Camera,
};

const colorMap = {
  'blue': 'bg-blue-500',
  'green': 'bg-green-500',
  'purple': 'bg-purple-500',
  'orange': 'bg-orange-500',
};

export const ActiveLessonsList: React.FC<ActiveLessonsListProps> = ({ lessons }) => {
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-medium text-gray-900 mb-4">
        Active Lesson
      </h3>

      <div>
        {lessons.map((lesson) => {
          const IconComponent = iconMap[lesson.icon as keyof typeof iconMap] || BookOpen;

          return (
            <div
              key={lesson.id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <div className="w-16 h-16 min-w-[3rem] rounded-full bg-primary flex items-center justify-center overflow-hidden mr-4">
                <img
                  src={`/assets/icons/${lesson.category}.svg`}
                  alt={lesson.category}
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-medium text-gray-900">
                  {lesson.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
