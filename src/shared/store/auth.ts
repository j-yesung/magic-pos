import { AuthState } from '@/types/common';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      auth: null,
      storeId: null,
      setStoreId: storeId => set(state => ({ ...state, storeId })),
      setSession: auth => set(state => ({ ...state, auth })),
    }),
    { name: 'auth' },
  ),
);

export default useAuthStore;
