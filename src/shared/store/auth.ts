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
      setStoreName: name => set({ storeName: name }),
      setStoreBno: bno => set({ storeBno: bno }),
      setStoreId: storeId => set({ storeId }),
      setSession: auth => set({ auth }),
    }),
    { name: 'auth' },
  ),
);

export default useAuthStore;
