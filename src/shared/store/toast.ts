import { create } from 'zustand';
import { ToastAnimationType, ToastTypeOption } from '@/types/common';

/**
 * 토스트 알람의 상태를 관리합니다.
 */

interface ToastState {
  toastList: ToastTypeOption[];
}

const useToastState = create<ToastState>()(() => ({
  toastList: [],
}));

export const addToastList = (toast: ToastTypeOption) => {
  useToastState.setState(state => ({ toastList: [...state.toastList, toast] }));
};

export const subtractToastList = (id: string) => {
  useToastState.setState(state => ({
    toastList: state.toastList.filter(toast => toast.id !== id),
  }));
};

// 해당 Toast에게 어떤 종류의 애니메이션을 실행할지 지정합니다.
export const setAnimation = (id: string, type: ToastAnimationType) => {
  useToastState.setState(state => ({
    toastList: state.toastList.map(toast => {
      if (toast.id === id) return { ...toast, animation: type };
      return toast;
    }),
  }));
};

export default useToastState;
