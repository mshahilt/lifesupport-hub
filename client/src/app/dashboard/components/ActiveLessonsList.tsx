import React from 'react';
import { Card } from '@/components/ui/Card';
import { LiveSession } from '@/types';


interface ActiveLessonsListProps {
  lessons: LiveSession[];
}


export const ActiveLessonsList: React.FC<ActiveLessonsListProps> = ({ lessons }) => {
  console.log(" lessons : ", lessons);
  return (
    <Card className="p-6">
      <h3 className="text-2xl font-medium text-gray-900 mb-4">
        Active Lesson
      </h3>

      <div>
        {lessons.map((lesson) => {
          return (
            <div
              key={lesson._id}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={`/assets/icons/${lesson.category.name}.svg`}
                alt={lesson.category.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/icons/default.svg';
                }}
                className="w-8 h-8 object-contain"
              />


              <div className="flex-1 flex flex-col justify-center">
                <h4 className="font-medium text-gray-900">
                  {lesson.category.name}
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
