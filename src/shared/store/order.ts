import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CategoryWithMenuItemWithStore, MenuItemWithOption, MenuOptionWithDetail } from '@/types/supabase';
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
  menuData: CategoryWithMenuItemWithStore[] | null;
  goNextStep: () => void;
  goPrevStep: () => void;
  setMenuData: (data: CategoryWithMenuItemWithStore[]) => void;
  orderList: MenuItemWithOption[];
  resetOrderList: () => void;
  addOrderList: (menu: MenuItemWithOption[]) => void;
  subtractOrderList: (menu: MenuItemWithOption) => void;
  getTotalPrice: (list: MenuItemWithOption[]) => number;
  getOptionPriceByList: (list: MenuOptionWithDetail[]) => number;
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
  selectedMenu: MenuItemWithOption | null;
  setSelectedMenu: (menu: MenuItemWithOption | null) => void;
  selectedOptions: MenuOptionWithDetail[];
  addSelectedOption: (selectedOption: MenuOptionWithDetail) => void;
  subtractSelectedOption: (id: string) => void;
  resetSelectedOptions: () => void;
  amount: number;
  addAmount: () => void;
  subtractAmount: () => void;
  resetAmount: () => void;
  resetSelectedMenu: () => void;
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
      setMenuData: data =>
        set(state => {
          if (state.menuData === null) {
            return { menuData: data };
          }
          return { menuData: state.menuData };
        }),
      // 주문에 담은 메뉴 목록을 나타냅니다.
      orderList: [],
      resetOrderList: () => set(() => ({ orderList: [] })),
      addOrderList: menu => set(state => ({ orderList: [...state.orderList, ...menu] })),
      subtractOrderList: menu =>
        set(state => {
          const findIndex = state.orderList.findLastIndex(o => o.id === menu.id);
          const newOrderList = [...state.orderList];
          newOrderList.splice(findIndex, 1);
          return { orderList: newOrderList };
        }),
      // orderList에 담긴 메뉴 아이템의 총합 가격을 나타냅니다.
      getTotalPrice: list => {
        return list
          ?.map(
            menu =>
              menu.menu_option
                ?.map(option => option.menu_option_detail.reduce((acc, cur) => acc + cur.price, 0))
                .reduce((acc, cur) => acc + cur, 0) + menu.price,
          )
          .reduce((acc, cur) => acc + cur, 0);
      },
      getOptionPriceByList: list => {
        return list
          .filter(item => item)
          .map(option =>
            option.menu_option_detail.reduce((acc, cur) => {
              return acc + cur.price;
            }, 0),
          )
          .reduce((acc, cur) => acc + cur, 0);
      },
      // 가게 ID
      storeId: null,
      setStoreId: storeId => set(() => ({ storeId })),
      // 주문 번호
      orderNumber: 0,
      setOrderNumber: orderNumber => set(() => ({ orderNumber })),
      // 테이블 아이디
      tableId: null,
      setTableId: tableId => set(() => ({ tableId })),
      // 주문 타입 (togo, store)
      orderType: { type: null },
      setOrderType: orderType => set(() => ({ orderType })),
      // 결제 승인시 토스에서 발급되는 orderId
      orderId: null,
      setOrderId: orderId => set(() => ({ orderId })),
      // 가게 이름
      storeName: '',
      setStoreName: storeName => set(() => ({ storeName })),
      swiperRef: null,
      setSwiperRef: swiperRef => set(() => ({ swiperRef })),
      optionSwiperRef: null,
      setOptionSwiperRef: optionSwiperRef => set(() => ({ optionSwiperRef })),
      // 선택된 메뉴 (옵션에서 사용)
      selectedMenu: null,
      setSelectedMenu: selectedMenu => set(() => ({ selectedMenu })),
      // 선택된 옵션
      selectedOptions: [],
      // 옵션 추가
      addSelectedOption: param =>
        set(state => {
          let newSelectedOptions = [...state.selectedOptions];
          // 이미 옵션이 있다면 기존 옵션에서 details만 갈아끼우고, 옵션이 없다면 새로 만든다.
          if (newSelectedOptions.length === 0) newSelectedOptions = [param];
          else {
            const find = state.selectedOptions.find(s => s.id === param.id);
            if (find) {
              newSelectedOptions = state.selectedOptions.map(option => {
                if (option.id === param.id) {
                  option.menu_option_detail = param.menu_option_detail;
                  return option;
                }
                return option;
              });
            } else {
              newSelectedOptions = [...state.selectedOptions, param];
            }
          }
          return { ...state, selectedOptions: newSelectedOptions };
        }),
      // 옵션 제거
      subtractSelectedOption: detailId =>
        set(state => ({
          selectedOptions: state.selectedOptions
            ?.map(option => {
              option.menu_option_detail = option.menu_option_detail.filter(detail => detail.id !== detailId);
              return option;
            })
            .filter(o => o.menu_option_detail.length > 0),
        })),
      // 옵션 초기화
      resetSelectedOptions: () => set(() => ({ selectedOptions: [] })),
      // 메뉴 하나 수량
      amount: 1,
      addAmount: () => set(state => ({ amount: state.amount + 1 })),
      subtractAmount: () => set(state => ({ amount: Math.max(state.amount - 1, 1) })),
      resetAmount: () => set(() => ({ amount: 1 })),
      resetSelectedMenu: () => {
        get().resetAmount();
        get().resetSelectedOptions();
        get().setSelectedMenu(null);
      },
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
