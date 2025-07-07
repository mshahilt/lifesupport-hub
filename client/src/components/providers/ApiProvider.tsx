'use client';

import { useEffect } from 'react';
import { setupAxiosInterceptors } from '@/lib/axios-interceptor';
import { useAuthStore } from '@/store/useAuthStore';

const ApiProvider = () => {
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) return; 

    const removeInterceptor = setupAxiosInterceptors(() => token);

    return () => {
      if (typeof removeInterceptor === 'function') {
        removeInterceptor();
      }
    };
  }, [token]);

  return null;
};

export default ApiProvider;
