import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CategoryWithMenuItem, Tables } from '@/types/supabase';
import { SwiperRef } from 'swiper/react';
import React from 'react';

export enum ORDER_STEP {
  CHOOSE_ORDER_TYPE,
  SELECT_MENU,
  CHECK_MENU,
  PAYMENT,
}

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
  orderList: Tables<'menu_item'>[];
  resetOrderList: () => void;
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
  optionSwiperRef: React.RefObject<SwiperRef> | null;
  setOptionSwiperRef: (ref: React.RefObject<SwiperRef>) => void;
  storeName: string;
  setStoreName: (storeName: string) => void;
  orderId: string | null;
  setOrderId: (orderId: string) => void;
  selectedMenu: Tables<'menu_item'> | null;
  setSelectedMenu: (menu: Tables<'menu_item'>) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      //  현재 주문 단계를 나타냅니다.
      step: ORDER_STEP.CHOOSE_ORDER_TYPE,
      maxStep: ORDER_STEP.PAYMENT,
      goNextStep: () => set(state => ({ step: Math.min(state.step + 1, state.maxStep) })),
      goPrevStep: () => set(state => ({ step: Math.max(state.step - 1, 0) })),
      // 메뉴, 카테고리가 담긴 데이터를 나타냅니다.
      menuData: null,
      setMenuData: (data: CategoryWithMenuItem[]) =>
        set(state => {
          if (state.menuData === null) {
            return { menuData: data };
          }
          return { menuData: state.menuData };
        }),
      // 주문에 담은 메뉴 목록을 나타냅니다.
      orderList: [],
      resetOrderList: () => set(() => ({ orderList: [] })),
      addOrderList: (menu: Tables<'menu_item'>[]) => set(state => ({ orderList: [...state.orderList, ...menu] })),
      subtractOrderList: (menu: Tables<'menu_item'>) =>
        set(state => {
          const findIndex = state.orderList.findLastIndex(o => o.id === menu.id);
          state.orderList.splice(findIndex, 1);
          return { orderList: state.orderList };
        }),
      // orderList에 담긴 메뉴 아이템의 총합 가격을 나타냅니다.
      getTotalPrice: () => get()?.orderList.reduce((acc, cur) => acc + cur.price, 0),
      // 가게 ID
      storeId: null,
      setStoreId: (storeId: string) => set(() => ({ storeId })),
      // 주문 번호
      orderNumber: 0,
      setOrderNumber: (orderNumber: number) => set(() => ({ orderNumber })),
      // 테이블 아이디
      tableId: null,
      setTableId: (tableId: string) => set(() => ({ tableId })),
      // 주문 타입 (togo, store)
      orderType: { type: null },
      setOrderType: (orderType: OrderType) => set(() => ({ orderType })),
      // 결제 승인시 토스에서 발급되는 orderId
      orderId: null,
      setOrderId: (orderId: string) => set(() => ({ orderId })),
      // 가게 이름
      storeName: '',
      setStoreName: (storeName: string) => set(() => ({ storeName })),
      swiperRef: null,
      setSwiperRef: (swiperRef: React.RefObject<SwiperRef>) => set(() => ({ swiperRef })),
      optionSwiperRef: null,
      setOptionSwiperRef: (optionSwiperRef: React.RefObject<SwiperRef>) => set(() => ({ optionSwiperRef })),
      // 선택된 메뉴 (옵션에서 사용)
      selectedMenu: null,
      setSelectedMenu: (selectedMenu: Tables<'menu_item'>) => set(() => ({ selectedMenu })),
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        orderId: state.orderId,
        orderType: state.orderType,
        storeId: state.storeId,
        orderNumber: state.orderNumber,
        orderList: state.orderList,
      }),
    },
  ),
);

export default useOrderStore;
