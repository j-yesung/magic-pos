import { create } from 'zustand';

interface SalesStore {
  isShow: boolean;
  record: {
    currentSales: number;
    dateType: string;
  };

  data: {
    x: string;
    y: number;
  }[];
  calendarData: { sales: number; date: string; min?: boolean; max?: boolean }[];
  salesSum: number | null;
  isChangeView: boolean;
  setIsShow: (param: boolean) => void;
  setData: (sales: { x: string; y: number }[]) => void;
  setRecord: (sales: { currentSales: number; dateType: string }) => void;
  setCalendarData: <T extends { sales: number; date: string; min?: boolean; max?: boolean }[]>(param: T) => void;
  setSalesSum: (sales: { sales: number; date: string }[] | null) => void;
  setIsChangeView: (param: boolean) => void;
}

const useSalesStore = create<SalesStore>()(set => ({
  data: [],
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
  setRecord: prop =>
    set(state => ({
      ...state,
      record: {
        ...state.record,
        ...prop,
      },
    })),
  setData: prop =>
    set(state => ({
      ...state,
      data: prop,
    })),
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
