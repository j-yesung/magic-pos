import { AuthState } from '@/types/common';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      auth: null,
      storeId: null,
      storeName: null,
      storeBno: null,
      setStroeName: name => set(state => ({ ...state, storeName: name })),
      setStoreBno: bno => set(state => ({ ...state, storeBno: bno })),
      setStoreId: storeId => set(state => ({ ...state, storeId })),
      setSession: auth => set(state => ({ ...state, auth })),
    }),
    { name: 'auth' },
  ),
);

export default useAuthStore;
