/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import useCategory from '@/hooks/useCategory';
import { base64ToBlob } from '@/lib/base64toBlob';
import api from '@/lib/axios';
import axios from 'axios';
import Image from 'next/image';

interface CreateLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateLiveModal: React.FC<CreateLiveModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    startTime: '',
    endTime: '',
    category: '',
    description: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { categories } = useCategory();
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = '';
      if(imagePreview) {
        imageUrl = await uploadImageToCloudinary();
      }
      
      const liveData = {
        ...formData,
        image: imageUrl
      };
      
      onSubmit(liveData);
      onClose();
    } catch (error) {
      console.error('Error creating live session:', error);
      alert('Failed to create live session. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (): Promise<string> => {
    try {
      if (!imagePreview) {
        throw new Error("No image selected");
      }

      setUploadingImage(true);

      let fileToUpload: { file: File; fileType: string };

      if (typeof imagePreview === "string" && imagePreview.startsWith("data:")) {
        fileToUpload = base64ToBlob(imagePreview);
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
      setUploadingImage(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Create New Live
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live Name
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter live name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              instructor
            </label>
            <Input
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Enter instructor name"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live Start Time
            </label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live End Time
            </label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border border-gray-600 rounded-lg px-4 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            {!showCategoryInput ? (
              <select
                name="category"
                value={formData.category}
                onChange={(e) => {
                  if (e.target.value === 'create-new') {
                    setShowCategoryInput(true);
                    setFormData({ ...formData, category: '' });
                  } else {
                    setFormData({ ...formData, category: e.target.value });
                  }
                }}
                className="w-full border border-gray-600 rounded-lg px-5 py-4"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                <option value="create-new">+ Create New Category</option>
              </select>
            ) : (
              <input
                type="text"
                placeholder="Enter new category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-gray-600 rounded-lg px-4 py-2"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter a brief description about the session"
            rows={4}
            className="w-full border border-gray-600 rounded-lg px-4 py-2 resize-none"
            required
          />
        </div>

        <div className="mt-6 min-h-12">
          <label htmlFor="image-upload">
            <div className="bg-gray-100 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto h-32 object-contain"
                />
              ) : (
                <>
                  <p className="text-sm text-gray-600">Upload Image</p>
                </>
              )}
            </div>
          </label>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8"
            disabled={uploadingImage}
          >
            {uploadingImage ? 'Uploading...' : 'Start the live'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};