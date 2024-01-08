import { create } from 'zustand';

/**
 * 일반고객의 주문과 관련된 전역 상태를 관리하는 store 입니다.
 */

interface OrderState {
  step: number;
  readonly maxStep: number;
  goNextStep: () => void;
  goPrevStep: () => void;
}

const useOrderState = create<OrderState>()(set => ({
  step: 0,
  maxStep: 4,
  goNextStep: () => set(state => ({ step: Math.min(state.step + 1, state.maxStep) })),
  goPrevStep: () => set(state => ({ step: Math.max(state.step - 1, 0) })),
}));

export default useOrderState;
