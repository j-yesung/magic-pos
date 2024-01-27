import { CalendarDataType } from '@/types/sales';
import { create } from 'zustand';
interface DataStore {
  calendarBindingData: CalendarDataType[];
  salesSum: number | null;
}
const useSalesDataState = create<DataStore>()(() => ({
  calendarBindingData: [],
  salesSum: null,
}));

export const setCalendarBindingData = (data: CalendarDataType[]) =>
  useSalesDataState.setState(state => ({
    ...state,
    calendarBindingData: data,
  }));

export const setSalesSum = (data: { sales: number; date: string }[] | null) =>
  useSalesDataState.setState(state => ({
    ...state,
    salesSum: data ? data.reduce((acc, cur) => acc + cur.sales, 0) : null,
  }));

export const resetCalendarBindingData = () =>
  useSalesDataState.setState(state => ({
    ...state,
    calendarBindingData: [],
  }));

export const resetSalesSum = () =>
  useSalesDataState.setState(state => ({
    ...state,
    salesSum: null,
  }));
export default useSalesDataState;
