'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Upload } from 'lucide-react';

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
    liveName: 'Basic Life Support',
    instructors: 'Mnamadhan',
    liveStartTime: '10:00:00 AM',
    liveEndTime: '11:30:00 AM',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              name="liveName"
              value={formData.liveName}
              onChange={handleChange}
              placeholder="Enter live name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructors
            </label>
            <Input
              name="instructors"
              value={formData.instructors}
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
            <Input
              name="liveStartTime"
              value={formData.liveStartTime}
              onChange={handleChange}
              placeholder="10:00:00 AM"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Live End Time
            </label>
            <Input
              name="liveEndTime"
              value={formData.liveEndTime}
              onChange={handleChange}
              placeholder="11:30:00 AM"
              required
            />
          </div>
        </div>
        
        <div className="mt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Upload Image</p>
          </div>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            Start the live
          </Button>
        </div>
      </form>
    </Modal>
  );
};