import { create } from 'zustand';
import { CategoryWithMenuItem } from '@/types/supabase';

/**
 * 일반고객의 주문과 관련된 전역 상태를 관리하는 store 입니다.
 */

interface OrderState {
  step: number;
  readonly maxStep: number;
  menuData: CategoryWithMenuItem[] | null;
  goNextStep: () => void;
  goPrevStep: () => void;
  setMenuData: (data: CategoryWithMenuItem[]) => void;
}

const useOrderStore = create<OrderState>()(set => ({
  //  현재 주문 단계를 나타냅니다.
  step: 0,
  maxStep: 4,
  menuData: null,
  goNextStep: () => set(state => ({ step: Math.min(state.step + 1, state.maxStep) })),
  goPrevStep: () => set(state => ({ step: Math.max(state.step - 1, 0) })),
  setMenuData: (data: CategoryWithMenuItem[]) =>
    set(state => {
      if (state.menuData === null) {
        return { menuData: data };
      }
      return { menuData: state.menuData };
    }),
}));

export default useOrderStore;
