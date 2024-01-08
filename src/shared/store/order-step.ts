import { create } from 'zustand';

// 예시 store 입니다.
interface OrderStepState {
  step: number;
  readonly maxStep: number;
  goNext: () => void;
  goPrev: () => void;
}

const useAuthStore = create<OrderStepState>()(set => ({
  step: 0,
  maxStep: 4,
  goNext: () => set(state => ({ step: Math.min(state.step + 1, state.maxStep) })),
  goPrev: () => set(state => ({ step: Math.max(state.step - 1, 0) })),
}));

export default useAuthStore;
