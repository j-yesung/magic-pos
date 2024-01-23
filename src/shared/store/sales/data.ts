import { create } from 'zustand';
interface DataStore {
  calendarBindingData: { sales: number; date: string; min?: boolean; max?: boolean }[];
  salesSum: number | null;
}
const useDataStore = create<DataStore>()(() => ({
  calendarBindingData: [],
  salesSum: null,
}));

export const setCalendarBindingData = (data: { sales: number; date: string; min?: boolean; max?: boolean }[]) =>
  useDataStore.setState(state => ({
    ...state,
    calendarBindingData: data,
  }));

export const setSalesSum = (data: { sales: number; date: string }[] | null) =>
  useDataStore.setState(state => ({
    ...state,
    salesSum: data ? data.reduce((acc, cur) => acc + cur.sales, 0) : null,
  }));

export const resetCalendarBindingData = () =>
  useDataStore.setState(state => ({
    ...state,
    calendarBindingData: [],
  }));

export const resetSalesSum = () =>
  useDataStore.setState(state => ({
    ...state,
    salesSum: null,
  }));
export default useDataStore;
