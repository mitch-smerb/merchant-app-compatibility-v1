import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReportsAuth } from '../../reports-auth-types';

interface ReportsAuthStore {
  auth: ReportsAuth | null;
  setAuth: (auth: ReportsAuth) => void;
  logout: () => void;
}

export const useReportsAuthStore = create<ReportsAuthStore>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth) => set({ auth }),
      logout: () => set({ auth: null }),
    }),
    {
      name: 'auth-reports-storage',
    }
  )
);
