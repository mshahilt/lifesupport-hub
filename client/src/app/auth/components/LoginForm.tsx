'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Eye, EyeOff } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: 'manmadhannaras@gmail.com',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // login here
    console.log('Login data:', formData);
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
              Hai, Welcome back
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your credentials to login your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                Password
              </label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm bg-primary hover:text-blue-500">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-blue-500"
              size="lg"
            >
              Login
            </Button>
          </form>
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
            <p className="text-gray-600 text-lg">Welcome back to your learning journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};