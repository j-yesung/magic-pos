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
  SUCCESS,
  RECEIPT,
}

/**
 * 일반고객의 주문과 관련된 전역 상태를 관리하는 store 입니다.
 */

interface KioskState {
  // state
  step: number;
  readonly maxStep: number;
  menuData: CategoryWithMenuItemWithStore[] | null;
  orderList: MenuItemWithOption[];
  storeId: string | null;
  prevStoreId: string | null;
  orderNumber: number;
  tableId: string | null;
  orderType: OrderType;
  swiperRef: React.RefObject<SwiperRef> | null;
  optionSwiperRef: React.RefObject<SwiperRef> | null;
  storeName: string;
  orderIdList: string[];
  selectedOptions: MenuOptionWithDetail[];
  amount: number;
  maxAmount: number;
  selectedMenu: MenuItemWithOption | null;
  isOptionPage: boolean;
  selectedLanguage: string;
  isWidgetRendering: boolean;
  isOnlyTable: boolean;
}

export const useKioskState = create<KioskState>()(
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
      storeId: null,
      prevStoreId: null,
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
      // 메뉴를 담을 수 있는 최대 수량
      maxAmount: 0,
      // 현재 페이지가 옵션 페이지인지 (옵션페이지 안에 Swiper가 하나 더 있어 구분하기 위함)
      isOptionPage: false,
      // 선택 언어
      selectedLanguage: 'lang-ko',
      // 토스 위젯 렌더링 여부
      isWidgetRendering: true,
      // 테이블 주문만 가능한 경우
      isOnlyTable: false,
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({
        orderIdList: state.orderIdList,
        orderType: state.orderType,
        storeId: state.storeId,
        prevStoreId: state.prevStoreId,
        orderNumber: state.orderNumber,
        orderList: state.orderList,
        tableId: state.tableId,
        storeName: state.storeName,
        selectedLanguage: state.selectedLanguage,
        menuData: state.menuData,
        step: state.step,
      }),
    },
  ),
);

// ACTIONS !!
export const setOrderNumber = (orderNumber: number) => useKioskState.setState(() => ({ orderNumber }));
export const setIsOptionPage = (isOptionPage: boolean) => useKioskState.setState(() => ({ isOptionPage }));
export const goNextStep = () => useKioskState.setState(state => ({ step: Math.min(state.step + 1, state.maxStep) }));
export const goPrevStep = () => useKioskState.setState(state => ({ step: Math.max(state.step - 1, 0) }));
export const setStep = (step: number) => useKioskState.setState(() => ({ step }));
export const setStoreId = (storeId: string) => useKioskState.setState(() => ({ storeId }));
export const setTableId = (tableId: string) => useKioskState.setState(() => ({ tableId }));
export const setOrderType = (orderType: OrderType) => useKioskState.setState(() => ({ orderType }));
export const setMenuData = (menuData: CategoryWithMenuItemWithStore[]) =>
  useKioskState.setState(() => {
    return { menuData };
  });
export const resetOrderList = () => useKioskState.setState({ orderList: [] });
export const addOrderList = (menu: MenuItemWithOption[]) =>
  useKioskState.setState(state => ({ orderList: [...state.orderList, ...menu], prevStoreId: state.storeId }));
export const subtractOrderList = (menuId: string) =>
  useKioskState.setState(state => {
    const findIndex = state.orderList.findLastIndex(o => o.id === menuId);
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
export const setSwiperRef = (swiperRef: React.RefObject<SwiperRef>) => useKioskState.setState(() => ({ swiperRef }));
export const setOptionSwiperRef = (optionSwiperRef: React.RefObject<SwiperRef>) =>
  useKioskState.setState(() => ({ optionSwiperRef }));
export const setStoreName = (storeName: string) => useKioskState.setState(() => ({ storeName }));
export const addOrderId = (orderId: string) =>
  useKioskState.setState(state => ({ orderIdList: [...state.orderIdList, orderId] }));
export const setSelectedMenu = (selectedMenu: MenuItemWithOption | null) =>
  useKioskState.setState(() => ({ selectedMenu }));
// 옵션 추가
export const addSelectedOption = (param: MenuOptionWithDetail) =>
  useKioskState.setState(state => {
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
  useKioskState.setState(state => ({
    selectedOptions: state.selectedOptions
      ?.map(option => {
        option.menu_option_detail = option.menu_option_detail.filter(detail => detail.id !== detailId);
        return option;
      })
      .filter(o => o.menu_option_detail.length > 0),
  }));
export const setSelectedLanguage = (selectedLanguage: string) => useKioskState.setState(() => ({ selectedLanguage }));
// 옵션 초기화
export const resetSelectedOptions = () => useKioskState.setState({ selectedOptions: [] });
export const addAmount = () => useKioskState.setState(state => ({ amount: state.amount + 1 }));
export const subtractAmount = () => useKioskState.setState(state => ({ amount: Math.max(state.amount - 1, 1) }));
export const resetAmount = () => useKioskState.setState({ amount: 1 });
export const resetSelectedMenu = () => {
  resetAmount();
  resetSelectedOptions();
  setSelectedMenu(null);
  setIsOptionPage(false);
};
export const setIsWidgetRendering = (isWidgetRendering: boolean) => useKioskState.setState({ isWidgetRendering });
export const setIsOnlyTable = (isOnlyTable: boolean) => useKioskState.setState({ isOnlyTable });
export const setMaxAmount = (maxAmount: number) => useKioskState.setState({ maxAmount });

export default useKioskState;
