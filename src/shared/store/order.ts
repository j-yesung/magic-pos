import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CategoryWithMenuItem, Tables } from '@/types/supabase';
import { SwiperRef } from 'swiper/react';
import React from 'react';

/**
 * 일반고객의 주문과 관련된 전역 상태를 관리하는 store 입니다.
 */

export enum ORDER_STEP {
  CHOOSE_ORDER_TYPE,
  SELECT_MENU,
  CHECK_MENU,
  PAYMENT,
}

interface OrderState {
  step: number;
  readonly maxStep: number;
  menuData: CategoryWithMenuItem[] | null;
  goNextStep: () => void;
  goPrevStep: () => void;
  setMenuData: (data: CategoryWithMenuItem[]) => void;
  orderList: Tables<'menu_item'>[];
  addOrderList: (menu: Tables<'menu_item'>[]) => void;
  subtractOrderList: (menu: Tables<'menu_item'>) => void;
  getTotalPrice: () => number;
  storeId: string | null;
  setStoreId: (storeId: string) => void;
  orderNumber: number;
  setOrderNumber: (orderNumber: number) => void;
  tableId: string | null;
  setTableId: (tableId: string) => void;
  orderType: OrderType;
  setOrderType: (orderType: OrderType) => void;
  swiperRef: React.RefObject<SwiperRef> | null;
  setSwiperRef: (ref: React.RefObject<SwiperRef>) => void;
  orderId: string | null;
  setOrderId: (orderId: string) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      //  현재 주문 단계를 나타냅니다.
      step: ORDER_STEP.CHOOSE_ORDER_TYPE,
      maxStep: ORDER_STEP.PAYMENT,
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
      orderList: [],
      addOrderList: (menu: Tables<'menu_item'>[]) => set(state => ({ orderList: [...state.orderList, ...menu] })),
      subtractOrderList: (menu: Tables<'menu_item'>) =>
        set(state => {
          const findIndex = state.orderList.findLastIndex(o => o.id === menu.id);
          state.orderList.splice(findIndex, 1);
          return { orderList: state.orderList };
        }),
      getTotalPrice: () => get()?.orderList.reduce((acc, cur) => acc + cur.price, 0),
      // 가게 ID
      storeId: null,
      setStoreId: (storeId: string) => set(() => ({ storeId })),
      // 주문 번호
      orderNumber: 0,
      setOrderNumber: (orderNumber: number) => set(() => ({ orderNumber })),
      tableId: null,
      setTableId: (tableId: string) => set(() => ({ tableId })),
      orderType: { type: null },
      setOrderType: (orderType: OrderType) => set(() => ({ orderType })),
      swiperRef: null,
      setSwiperRef: (swiperRef: React.RefObject<SwiperRef>) => set(() => ({ swiperRef })),
      orderId: null,
      setOrderId: (orderId: string) => set(() => ({ orderId })),
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => Object.fromEntries(Object.entries(state).filter(([key]) => !['swiperRef'].includes(key))),
    },
  ),
);

export default useOrderStore;
