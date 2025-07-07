import React from 'react';
import { Card } from '@/components/ui/Card';
import { LiveSession } from '@/types';
import Image from 'next/image';


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
              <div className="w-16 h-16 min-w-[3rem] rounded-full bg-primary flex items-center justify-center overflow-hidden mr-4">
                <Image
                  src={`/assets/icons/${lesson.category.name}.svg`}
                  alt="/assets/icons/research.svg"
                  className="w-8 h-8 object-contain"
                />
              </div>

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
