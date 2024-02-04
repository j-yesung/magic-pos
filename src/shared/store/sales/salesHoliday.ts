import { HolidaysType } from '@/types/sales';
import { create } from 'zustand';
interface HolidayState {
  holidays: HolidaysType;
}
const initialHolidays: HolidaysType = {};
const useHolidayState = create<HolidayState>()(() => ({
  holidays: initialHolidays,
}));

export default useHolidayState;

export const setHolidayState = (staticProps: HolidaysType) =>
  useHolidayState.setState(state => ({
    ...state,
    holidays: staticProps,
  }));
