import moment, { Moment } from 'moment';
import { create } from 'zustand';
interface DayState {
  today: Moment;
  utcStandardDate: Moment;
  selectedDate: Moment;
}
const today = moment();
const selectedDate = moment();
const utcStandardDate = moment().hour(0).subtract(9, 'hour');

const useDayState = create<DayState>()(() => ({
  today,
  selectedDate,
  utcStandardDate,
}));

export default useDayState;

export const setSelectedDate = (day: Moment) =>
  useDayState.setState(state => ({
    ...state,
    selectedDate: day,
  }));

export const resetSelectedDate = () =>
  useDayState.setState(state => ({
    ...state,
    selectedDate,
  }));
