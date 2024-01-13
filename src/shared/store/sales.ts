import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface SalesStore {
  isShow: boolean;
  record: {
    currentSales: number;
    dateType: string;
  };
  date: {
    today: Moment;
    yesterday: Moment;
    currentDate: Moment;
    utcStandardDate: Moment;
    selectedDate: Moment;
  };
  data: {
    x: string;
    y: number;
  }[];
  calendarData: { sales: number; date: string; min?: boolean; max?: boolean }[];

  setIsShow: (param?: boolean) => void;
  setData: (sales: { x: string; y: number }[]) => void;
  setCurrentDate: (day: Moment) => void;
  setSelectedDate: (day: Moment) => void;
  setRecord: (sales: { currentSales: number; dateType: string }) => void;
  setCalendarData: <T extends { sales: number; date: string; min?: boolean; max?: boolean }[]>(param: T) => void;
}

const useSalesStore = create<SalesStore>()(set => ({
  data: [],
  isShow: false,
  record: {
    currentSales: 0,
    dateType: '',
  },
  date: {
    today: moment(),
    yesterday: moment().subtract(1, 'day'),
    currentDate: moment(),
    selectedDate: moment().clone(),
    // utcStandardDate는 supabase의 Sales에서 데이터를 가져올 때 사용합니다.
    utcStandardDate: moment().hour(0).subtract(9, 'hour'),
  },
  calendarData: [],

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
      isShow: prop ? prop : !state.isShow,
    })),
  setCurrentDate: prop =>
    set(state => ({
      ...state,
      date: {
        ...state.date,
        currentDate: prop,
      },
    })),
  setSelectedDate: prop =>
    set(state => ({
      ...state,
      date: {
        ...state.date,
        selectedDate: prop,
      },
    })),
  setCalendarData: prop =>
    set(state => ({
      ...state,
      calendarData: prop,
    })),
}));

export default useSalesStore;
