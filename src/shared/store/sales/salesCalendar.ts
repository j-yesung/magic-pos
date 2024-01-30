import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
interface CalendarStore {
  currentDate: Dayjs;
}

/**
 * Value
 */
const useCalendarState = create<CalendarStore>()(() => ({
  currentDate: dayjs(),
}));

/**
 * Action
 */
export const setCalendarCurrentDate = (currentDate: Dayjs) =>
  useCalendarState.setState(state => ({
    ...state,
    currentDate,
  }));

export const resetCurrentDate = () => useCalendarState.setState(state => ({ ...state, currentDate: dayjs() }));
export default useCalendarState;
