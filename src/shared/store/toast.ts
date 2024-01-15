import { create } from 'zustand';
import { ToastAnimationType, ToastTypeOption } from '@/types/common';

/**
 * 토스트 알람의 상태를 관리합니다.
 */

interface ToastState {
  toastList: ToastTypeOption[];
  addToastList: (elem: ToastTypeOption) => void;
  subtractToastList: (id: string) => void;
  setAnimation: (id: string, type: ToastAnimationType) => void;
}

const useToastStore = create<ToastState>()(set => ({
  toastList: [],
  addToastList: (toast: ToastTypeOption) => set(state => ({ toastList: [...state.toastList, toast] })),
  subtractToastList: (id: string) =>
    set(state => ({
      toastList: state.toastList.filter(toast => toast.id !== id),
    })),
  setAnimation: (id: string, type: ToastAnimationType) =>
    set(state => ({
      toastList: state.toastList.map(toast => {
        if (toast.id === id) return { ...toast, animation: type };
        return toast;
      }),
    })),
}));

export default useToastStore;
