import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string,
}


export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};
