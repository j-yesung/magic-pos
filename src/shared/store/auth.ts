import { AuthState } from '@/types/common';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 예시 store 입니다.

const useAuthStore = create<AuthState>()(
  // setSession: session => set({ session }),
  persist(
    set => ({
      session: null,
      setSession: session => set({ session }),
    }),
    { name: 'user-StoreName' },
  ),
);

export default useAuthStore;
