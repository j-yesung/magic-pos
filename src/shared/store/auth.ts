import { AuthState } from '@/types/common';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      session: null,
      setSession: session => set({ session }),
    }),
    { name: 'session-status' },
  ),
);

export default useAuthStore;
