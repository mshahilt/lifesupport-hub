import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
  <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

  <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
    {title && (
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
    )}

    <div className="px-12 py-8">
      {children}
    </div>
  </div>
</div>

);

};
