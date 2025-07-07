'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/axios';
import axios from 'axios';  
import { base64ToBlob } from '@/lib/base64toBlob';


export const RegisterForm: React.FC<{role:string}> = ({role}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: role,
    avatar: ''
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const { register, loading, error } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatarToCloudinary = async (): Promise<string> => {
    try {
      if (!avatarPreview) {
        throw new Error("No avatar selected");
      }

      setUploadingAvatar(true);

      let fileToUpload: { file: File; fileType: string };

      if (typeof avatarPreview === "string" && avatarPreview.startsWith("data:")) {
        fileToUpload = base64ToBlob(avatarPreview);
      } else {
        throw new Error("Invalid avatar format");
      }

      const formData = new FormData();
      formData.append("file", fileToUpload.file);

      const response = await api.get("/cloudinary/signature");

      const { signature, timestamp, upload_url, api_key } = response.data.signedUrl;
      if (!signature || !timestamp || !upload_url || !api_key) {
        throw new Error("Invalid upload credentials received");
      }

      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);

      const uploadResponse = await axios.post(upload_url, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          console.log("Avatar Upload Progress:", percentCompleted);
        },
      });

      console.log("Avatar Upload Response:", uploadResponse.data);
      return uploadResponse.data.secure_url;
    } catch (error) {
      console.error("Avatar upload failed:", error);
      throw error;
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let avatarUrl = '';
      
      if (avatarPreview) {
        avatarUrl = await uploadAvatarToCloudinary();
      }

      const registrationData = {
        ...formData,
        avatar: avatarUrl
      };

      const success = await register(registrationData);
      if(success) {
        window.location.href = '/dashboard';
      }
      console.log('Registration data:', registrationData);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 relative max-h-screen">
  <div className="absolute top-6 left-6 z-50">
  <img
    src="/assets/logo.svg"
    alt="Logo"
    className="w-[180px] h-auto max-w-full"
  />
</div>

  <div className="flex items-center justify-center px-6 py-12">
    <div className="w-full max-w-md mt-6">
      <h2 className="text-4xl font-semibold text-gray-900 mb-2 text-center">
        Register Your Account
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Enter your credentials to register your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-2xl">👤</div>
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500">Upload your profile picture</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <Input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
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
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <Input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="text-[20px] tracking-widest"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-blue-500 px-5 py-4 text-white text-lg font-bold rounded-md"
          disabled={loading || uploadingAvatar}
        >
          {uploadingAvatar
            ? 'Uploading Avatar...'
            : loading
            ? 'Registering...'
            : 'Register Now'}
        </Button>
      </form>

      <p className="text-sm text-center text-gray-400 mt-10">
        Powered by Duty Doctor <br />
        © 2025 life support learning. All rights reserved.
      </p>
    </div>
  </div>

  <div className="hidden lg:flex items-center justify-center h-screen bg-white">
    <div className="h-[90%] flex items-center justify-center">
      <img
        src="/assets/images/register-doctor.png"
        alt="Doctor"
        className="h-full w-auto object-contain"
      />
    </div>
  </div>
</div>

  );
};