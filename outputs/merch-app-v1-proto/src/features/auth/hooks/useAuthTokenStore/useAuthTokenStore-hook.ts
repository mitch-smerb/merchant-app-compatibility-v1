import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Auth } from '../../auth-types';

interface AuthTokenStore {
  authToken: Auth | null;
  setToken: (auth: Auth) => void;
  clearToken: () => void;
}

export const useAuthTokenStore = create<AuthTokenStore>()(
  persist(
    (set) => ({
      authToken: null,
      setToken: (authToken) => set({ authToken }),
      clearToken: () => set({ authToken: null }),
    }),
    {
      name: 'auth-token-storage',
    }
  )
)
