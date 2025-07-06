"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    Sun,
    Moon,
  X
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '/assets/icons/dashboard' },
  { name: 'Start Live', href: '/live', icon: '/assets/icons/start-live' },
  { name: 'Monetization', href: '/monetization', icon: '/assets/icons/monetization' },
  { name: 'Reviews', href: '/reviews', icon: '/assets/icons/review' },
  { name: 'Notification', href: '/notification', icon: '/assets/icons/notification' },
  { name: 'Settings', href: '/settings', icon: '/assets/icons/settings' },
];


export const Sidebar: React.FC<SidebarProps> = ({isOpen, onToggle}) => {
    const pathname = usePathname();

    return (
        <>
         {/* mobile back drop */}
         {isOpen && (
            <div
                className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden"
                onToggle={onToggle}
            />
          )}


         {/* sidebar */}
         <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r border-gray-200 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-center h-24 px-4">
                    <div className="flex items-center justify-center">
                        <img src="/assets/logo.svg" alt="logo" className="w-48 h-48 object-contain" />
                    </div>
                    <button
                        onClick={onToggle}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 ml-auto"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="mt-8 px-4 space-y-5">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        
                        return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`
                            flex items-center px-3 py-4 text-sm font-medium rounded-3xl transition-colors
                            ${isActive 
                                ? 'bg-blue-50 text-primary ml-5' 
                                : 'text-gray-700 hover:bg-gray-100'
                            }
                            `}
                        >
                            <img src={`${item.icon}.svg`} alt={item.name} className="w-6 h-6 mr-3"/>
                            {item.name}
                        </Link>
                        );
                    })}
                </nav>
               <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gradient-to-br from-blue-100 to-secondary rounded-lg p-4">
                        <div className="mb-2">
                        <img src="/assets/emoji/party.svg" alt="Icon" className="h-6 w-6" />
                        </div>
                        <div className="text-left mb-4">
                        <p className="text-sm text-gray-700">
                            Upgrade to able to make unlimited videos as you like AI
                        </p>
                        </div>

                        <div className="flex justify-center">
                        <button className="bg-white text-sm rounded-full px-6 py-2">
                            Upgrade Now 🔥
                        </button>
                        </div>
                    </div>
                </div>
         </div>
        </>
    )
}