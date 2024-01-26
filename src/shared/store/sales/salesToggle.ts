import { create } from 'zustand';

interface SalesStore {
  isShow: boolean;
  isChangeView: boolean;
}

/**
 * Value
 */
const useSalesToggle = create<SalesStore>()(() => ({
  // calendar toggle
  isShow: false,
  // component 매출달력, 매출현황 toggle
  isChangeView: false,
}));

/**
 * Action
 */

export const setIsShow = (param: boolean) =>
  useSalesToggle.setState(state => ({
    ...state,
    isShow: param,
  }));

export const setIsChangeView = (param: boolean) =>
  useSalesToggle.setState(state => ({
    ...state,
    isChangeView: param,
  }));

export const resetIsShow = () =>
  useSalesToggle.setState(state => ({
    ...state,
    isShow: false,
  }));

export const resetIsChangeView = () =>
  useSalesToggle.setState(state => ({
    ...state,
    isChangeView: false,
  }));
export default useSalesToggle;
