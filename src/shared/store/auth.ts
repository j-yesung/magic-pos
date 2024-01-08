import { create } from 'zustand';

// 예시 store 입니다.
interface AuthState {
  id: string;
}

const useAuthStore = create<AuthState>()(() => ({
  id: '',
}));

export default useAuthStore;
