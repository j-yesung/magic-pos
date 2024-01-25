import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface CalendarStore {
  currentDate: Moment;
}

/**
 * Value
 */
const useCalendarState = create<CalendarStore>()(() => ({
  currentDate: moment(),
}));

/**
 * Action
 */
export const setCalendarCurrentDate = (currentDate: Moment) =>
  useCalendarState.setState(state => ({
    ...state,
    currentDate,
  }));

export const resetCurrentDate = () => useCalendarState.setState(state => ({ ...state, currentDate: moment() }));
export default useCalendarState;
