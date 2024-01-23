import { create } from 'zustand';

interface SalesStore {
  isShow: boolean;
  isChangeView: boolean;
  setIsShow: (param: boolean) => void;
  setIsChangeView: (param: boolean) => void;
}

const useSalesStore = create<SalesStore>()(set => ({
  isShow: false,
  isChangeView: false,
  /**
   */

  setIsShow: prop =>
    set(state => ({
      ...state,
      isShow: prop,
    })),

  setIsChangeView: prop =>
    set(state => ({
      ...state,
      isChangeView: prop,
    })),
}));

export default useSalesStore;
