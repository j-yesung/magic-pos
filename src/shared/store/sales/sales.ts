import { create } from 'zustand';

interface SalesStore {
  isShow: boolean;

  calendarData: { sales: number; date: string; min?: boolean; max?: boolean }[];
  salesSum: number | null;
  isChangeView: boolean;
  setIsShow: (param: boolean) => void;

  setCalendarData: <T extends { sales: number; date: string; min?: boolean; max?: boolean }[]>(param: T) => void;
  setSalesSum: (sales: { sales: number; date: string }[] | null) => void;
  setIsChangeView: (param: boolean) => void;
}

const useSalesStore = create<SalesStore>()(set => ({
  isShow: false,
  record: {
    currentSales: 0,
    dateType: '',
  },
  calendarData: [],
  salesSum: null,
  isChangeView: false,
  /**
   */

  setIsShow: prop =>
    set(state => ({
      ...state,
      isShow: prop,
    })),

  setCalendarData: prop =>
    set(state => ({
      ...state,
      calendarData: prop,
    })),
  setSalesSum: prop =>
    set(state => ({
      ...state,
      salesSum: prop ? prop.reduce((acc, cur) => acc + cur.sales, 0) : null,
    })),
  setIsChangeView: prop =>
    set(state => ({
      ...state,
      isChangeView: prop,
    })),
}));

export default useSalesStore;
