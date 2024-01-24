import moment, { Moment } from 'moment';
import { create } from 'zustand';

interface CalendarStore {
  today: Moment;
  currentDate: Moment;
  selectedDate: Moment;
  utcStandardDate: Moment;
}

/**
 * Value
 */
const useCalendarStore = create<CalendarStore>()(() => ({
  today: moment(),
  currentDate: moment(),
  selectedDate: moment(),
  utcStandardDate: moment().hour(0).subtract(9, 'hour'),
}));

/**
 * Action
 */
export const setCalendarCurrentDate = (currentDate: Moment) =>
  useCalendarStore.setState(state => ({
    ...state,
    currentDate,
  }));

export const setCalendarSelectedDate = (selectedDate: Moment) =>
  useCalendarStore.setState(state => ({
    ...state,
    selectedDate,
  }));

export const resetCurrentDate = () => useCalendarStore.setState(state => ({ ...state, currentDate: moment() }));
export default useCalendarStore;
