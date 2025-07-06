'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'Mnamadhan',
    email: 'manmadhannaras@gmail.com',
    mobileNumber: '+91 97913 36435',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="text-blue-600 font-bold text-2xl mb-8">
              life support<br />
              <span className="text-lg">learning</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Register Your Account
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your credentials to Register your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <Input
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Register Now
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Powered by Duty Doctor<br />
              © 2025 life support learning. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="text-4xl">👨‍⚕️</div>
              </div>
            </div>
            <p className="text-gray-600 text-lg">Join our learning community</p>
          </div>
        </div>
      </div>
    </div>
  );
};