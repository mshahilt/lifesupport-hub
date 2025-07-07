/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/lib/axios';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
  userId: string;
}

const useCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/category');
      setCategories(res.data?.categories);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/category', { name });
      setCategories((prev) => [...prev, res.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    addCategory,
    refresh: fetchCategories,
  };
};

export default useCategory;
