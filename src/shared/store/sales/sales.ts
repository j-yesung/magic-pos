import { create } from 'zustand';

interface SalesStore {
  isShow: boolean;
  isChangeView: boolean;
}

/**
 * Value
 */
const useSalesStore = create<SalesStore>()(() => ({
  // calendar toggle
  isShow: false,
  // component 매출달력, 매출현황 toggle
  isChangeView: false,
}));

/**
 * Action
 */

export const setIsShow = (param: boolean) =>
  useSalesStore.setState(state => ({
    ...state,
    isShow: param,
  }));

export const setIsChangeView = (param: boolean) =>
  useSalesStore.setState(state => ({
    ...state,
    isChangeView: param,
  }));

export const resetIsShow = () =>
  useSalesStore.setState(state => ({
    ...state,
    isShow: false,
  }));

export const resetIsChangeView = () =>
  useSalesStore.setState(state => ({
    ...state,
    isChangeView: false,
  }));
export default useSalesStore;
