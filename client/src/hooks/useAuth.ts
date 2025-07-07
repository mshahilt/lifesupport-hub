/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import api from '@/lib/axios';
import { User } from '@/types';
import { useAuthStore } from '@/store/useAuthStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLogin = useAuthStore((state) => state.login);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.post('/user/login', { email, password });

      const { user, token } = res.data?.user;
      console.log("res.data", res.data);
      setLogin(user, token);

      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (user: User) => {
    setLoading(true);
    try {
      await api.post('/user/register', user);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Register failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
};
