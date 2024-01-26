import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserAuth {
  session: Session | null;
  storeId: string | null;
  storeName: string | null;
  storeBno: string | null;
}

const useAuthState = create<UserAuth>()(
  persist(
    get => ({
      session: null,
      storeId: null,
      storeName: null,
      storeBno: null,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const setStoreName = (storeName: string | null) => useAuthState.setState(state => ({ ...state, storeName }));
export const setStoreBno = (storeBno: string | null) => useAuthState.setState(state => ({ ...state, storeBno }));
export const setStoreId = (storeId: string | null) => useAuthState.setState(state => ({ ...state, storeId }));
export const setSession = (session: Session | null) => useAuthState.setState(state => ({ ...state, session }));

export default useAuthState;
