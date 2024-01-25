import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface CalendarStore {
  currentDate: Moment;
}

/**
 * Value
 */
const useCalendarStore = create<CalendarStore>()(() => ({
  currentDate: moment(),
}));

/**
 * Action
 */
export const setCalendarCurrentDate = (currentDate: Moment) =>
  useCalendarStore.setState(state => ({
    ...state,
    currentDate,
  }));

export const resetCurrentDate = () => useCalendarStore.setState(state => ({ ...state, currentDate: moment() }));
export default useCalendarStore;
