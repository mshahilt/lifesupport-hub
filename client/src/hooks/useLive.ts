/* eslint-disable @typescript-eslint/no-explicit-any */

import api from "@/lib/axios";
import { LiveSession } from "@/types";
import { useEffect, useState } from "react";

const useLive = () => {
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLives = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/live');
      console.log("use live res.data :", res.data);
      setLiveSessions(res.data?.live || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch live sessions');
    } finally {
      setLoading(false);
    }
  };

  const addLiveSession = async (data: LiveSession) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/live', data);
      setLiveSessions((prev) => [...prev, res.data?.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add live session');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (sessionId: string, status: "upcoming" | "live" | "completed") => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.patch('/live/status', {sessionId, status});
      setLiveSessions((prev) => [...prev, res.data?.live]);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to fetch live sessions');
      setError(err.response?.data?.message || 'Failed to add live session');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLives();
  }, []);

  return {
    liveSessions,
    loading,
    error,
    updateStatus,
    fetchLives,
    addLiveSession,
  };
};

export default useLive;
