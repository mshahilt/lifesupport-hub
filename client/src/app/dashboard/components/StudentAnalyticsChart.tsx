'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StudentAnalyticsChartProps {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
}

export const StudentAnalyticsChart: React.FC<StudentAnalyticsChartProps> = ({
  totalStudents,
  maleStudents,
  femaleStudents,
}) => {
  const data = [
    { name: 'Male', value: maleStudents },
    { name: 'Female', value: femaleStudents },
    { name: 'Remaining', value: Math.max(0, totalStudents - maleStudents - femaleStudents) },
  ];

  const COLORS = ['#3B82F6', '#EF4444', '#F3F4F6']; // blue, red, light-gray

  return (
    <div className="bg-white rounded-[40px] p-6 w-full max-w-sm shadow-md">
      <h3 className="text-2xl font-semibold text-black mb-6">Student Analytics</h3>

      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"    
                innerRadius={70}
                outerRadius={90}
                startAngle={90}
                endAngle={-270}
                paddingAngle={1}
                dataKey="value"
                cornerRadius={40}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500">Total Student’s</p>
            <p className="text-lg font-bold text-black"> {totalStudents} Peoples</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-12 w-full">
          <div className="text-center">
            <p className="text-lg text-blue-500 font-medium">Male</p>
            <p className="text-xl font-bold text-black">{maleStudents}</p>
          </div>
          <div className="text-center">
            <p className="text-lg text-rose-500 font-medium">Female</p>
            <p className="text-xl font-bold text-black">{femaleStudents}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage
export default function StudentAnalyticsDemo() {
  return (
    <div className="p-10 min-h-screen bg-gray-50 flex items-center justify-center">
      <StudentAnalyticsChart totalStudents={250} maleStudents={100} femaleStudents={150} />
    </div>
  );
}
