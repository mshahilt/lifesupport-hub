import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { decodeJWT } from '@/lib/jwt';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasHydrated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          const decoded = decodeJWT(state.token);
          if (decoded) {
            state.user = {
              id: decoded.id,
              email: decoded.email,
              role: decoded.role,
              name: decoded.name,
              avatar: decoded.avatar
            };
          }
        }
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
