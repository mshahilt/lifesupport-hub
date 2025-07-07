'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);

      const success = await login(formData.email, formData.password);
      if (success) {
        console.log("success", success);
        window.location.href = '/dashboard';
      }
  };

  return (
     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 relative max-h-screen">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Image src="/assets/logo.svg" alt="Logo" width={180} height={50} />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md mt-6">
          <h2 className="text-4xl font-semibold text-gray-900 mb-2 text-center">
            Hoi, Welcome back
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Enter your credentials to login your account
          </p>

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
                  className="text-[20px] tracking-widest pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-blue-500 px-5 py-4 text-white text-lg font-bold rounded-md"
            >
              Login
            </Button>


          </form>

          <p className="text-xs text-center text-gray-400 mt-10">
            Powered by Duty Doctor <br />
            © 2025 life support learning. All rights reserved.
          </p>
        </div>
      </div>
   <div className="hidden lg:flex items-center justify-center h-screen bg-white">
    <div className="h-[90%] flex items-center justify-center">
      <Image
        src="/assets/images/login-doctor.png"
        alt="Doctor"
        className="h-full w-auto object-contain"
      />
    </div>
    </div>

    </div>
  );
};