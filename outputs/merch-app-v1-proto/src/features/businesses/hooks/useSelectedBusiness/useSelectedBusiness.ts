import { create } from 'zustand';
import { Business } from '../../businesses-types';

interface BusinessStore {
  selectedBusiness: Business | null;
  setSelectedBusiness: (business: any) => void;
  clearSelectedBusiness: () => void;
}

export const useBusinessStore = create<BusinessStore>((set) => ({
  selectedBusiness: null,
  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
  clearSelectedBusiness: () => set({ selectedBusiness: null })
}));
