import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface SalesState {
  isShow: boolean;
  date: {
    currentDate: Moment;
    utcStandardDate: Moment;
    selectedDate: Moment;
  };
  data: {
    x: string;
    y: number;
  }[];
  setIsShow: (param?: boolean) => void;
  setData: (param: { x: string; y: number }[]) => void;
  setCurrentDate: (day: Moment) => void;
  setSelectedDate: (day: Moment) => void;
}

const useSalesState = create<SalesState>()(set => ({
  data: [],
  isShow: false,
  date: {
    currentDate: moment(),
    selectedDate: moment().clone(),
    // utcStandardDate는 supabase의 Sales에서 데이터를 가져올 때 사용합니다.
    utcStandardDate: moment().hour(0).subtract(9, 'hour'),
  },

  /**
   */
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
}));

export default useSalesState;
