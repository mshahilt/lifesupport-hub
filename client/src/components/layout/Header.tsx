'use client';

import React from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  title: string;
  user: {
    name: string;
    avatar?: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, title, user }) => {
  return (
    <header className="bg-white h-24">
      <div className="flex items-center justify-between px-4 h-full">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl text-gray-900 ml-2 lg:ml-0">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user.name}
            </span>
            <ChevronDown size={16} className="text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
};
