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
  // state
  step: number;
  readonly maxStep: number;
  menuData: CategoryWithMenuItemWithStore[] | null;
  orderList: MenuItemWithOption[];
  storeId: string | null;
  orderNumber: number;
  tableId: string | null;
  orderType: OrderType;
  swiperRef: React.RefObject<SwiperRef> | null;
  optionSwiperRef: React.RefObject<SwiperRef> | null;
  storeName: string;
  orderIdList: string[];
  selectedOptions: MenuOptionWithDetail[];
  amount: number;
  selectedMenu: MenuItemWithOption | null;
}

export const useOrderStore = create<OrderState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get => ({
      //  현재 주문 단계를 나타냅니다.
      step: ORDER_STEP.CHOOSE_ORDER_TYPE,
      maxStep: ORDER_STEP.PAYMENT,
      // 메뉴, 카테고리가 담긴 데이터를 나타냅니다.
      menuData: null,
      // 주문에 담은 메뉴 목록을 나타냅니다.
      orderList: [],
      // 가게 ID
      storeId: null as string | null,
      // 주문 번호
      orderNumber: 0,
      // 테이블 아이디
      tableId: null,
      // 주문 타입 (togo, store)
      orderType: { type: null },
      // 결제 승인시 토스에서 발급되는 orderId를 List에 담는다. (여러 개 조회 가능)
      orderIdList: [],
      // 가게 이름
      storeName: '',
      swiperRef: null,
      optionSwiperRef: null,
      // 선택된 메뉴 (옵션에서 사용)
      selectedMenu: null,
      // 선택된 옵션
      selectedOptions: [],
      // 메뉴 하나 수량
      amount: 1,
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        orderIdList: state.orderIdList,
        orderType: state.orderType,
        storeId: state.storeId,
        orderNumber: state.orderNumber,
        orderList: state.orderList,
      }),
    },
  ),
);

// ACTIONS !!
export const setOrderNumber = (orderNumber: number) => useOrderStore.setState(() => ({ orderNumber }));
export const goNextStep = () => useOrderStore.setState(state => ({ step: Math.min(state.step + 1, state.maxStep) }));
export const goPrevStep = () => useOrderStore.setState(state => ({ step: Math.max(state.step - 1, 0) }));
export const setStoreId = (storeId: string) => useOrderStore.setState(() => ({ storeId }));
export const setTableId = (tableId: string) => useOrderStore.setState(() => ({ tableId }));
export const setOrderType = (orderType: OrderType) => useOrderStore.setState(() => ({ orderType }));
export const setMenuData = (data: CategoryWithMenuItemWithStore[]) =>
  useOrderStore.setState(state => {
    if (state.menuData === null) {
      return { menuData: data };
    }
    return { menuData: state.menuData };
  });
export const resetOrderList = () => useOrderStore.setState({ orderList: [] });
export const addOrderList = (menu: MenuItemWithOption[]) =>
  useOrderStore.setState(state => ({ orderList: [...state.orderList, ...menu] }));
export const subtractOrderList = (menu: MenuItemWithOption) =>
  useOrderStore.setState(state => {
    const findIndex = state.orderList.findLastIndex(o => o.id === menu.id);
    const newOrderList = [...state.orderList];
    newOrderList.splice(findIndex, 1);
    return { orderList: newOrderList };
  });
export const getTotalPrice = (list: MenuItemWithOption[]) => {
  return list
    ?.map(
      menu =>
        menu.menu_option
          ?.map(option => option.menu_option_detail.reduce((acc, cur) => acc + cur.price, 0))
          .reduce((acc, cur) => acc + cur, 0) + menu.price,
    )
    .reduce((acc, cur) => acc + cur, 0);
};
// orderList에 담긴 메뉴 아이템의 총합 가격을 나타냅니다.
export const getOptionPriceByList = (list: MenuOptionWithDetail[]) => {
  return list
    .filter(item => item)
    .map(option =>
      option.menu_option_detail.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0),
    )
    .reduce((acc, cur) => acc + cur, 0);
};
export const setSwiperRef = (swiperRef: React.RefObject<SwiperRef>) => useOrderStore.setState(() => ({ swiperRef }));
export const setOptionSwiperRef = (optionSwiperRef: React.RefObject<SwiperRef>) =>
  useOrderStore.setState(() => ({ optionSwiperRef }));
export const setStoreName = (storeName: string) => useOrderStore.setState(() => ({ storeName }));
export const addOrderId = (orderId: string) =>
  useOrderStore.setState(state => ({ orderIdList: [...state.orderIdList, orderId] }));
export const setSelectedMenu = (selectedMenu: MenuItemWithOption | null) =>
  useOrderStore.setState(() => ({ selectedMenu }));
// 옵션 추가
export const addSelectedOption = (param: MenuOptionWithDetail) =>
  useOrderStore.setState(state => {
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
  });
// 옵션 제거
export const subtractSelectedOption = (detailId: string) =>
  useOrderStore.setState(state => ({
    selectedOptions: state.selectedOptions
      ?.map(option => {
        option.menu_option_detail = option.menu_option_detail.filter(detail => detail.id !== detailId);
        return option;
      })
      .filter(o => o.menu_option_detail.length > 0),
  }));
// 옵션 초기화
export const resetSelectedOptions = () => useOrderStore.setState({ selectedOptions: [] });
export const addAmount = () => useOrderStore.setState(state => ({ amount: state.amount + 1 }));
export const subtractAmount = () => useOrderStore.setState(state => ({ amount: Math.max(state.amount - 1, 1) }));
export const resetAmount = () => useOrderStore.setState({ amount: 1 });
export const resetSelectedMenu = () => {
  resetAmount();
  resetSelectedOptions();
  setSelectedMenu(null);
};

export default useOrderStore;
