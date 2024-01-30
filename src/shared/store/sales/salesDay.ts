import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import week from 'dayjs/plugin/weekOfYear';
import 'dayjs/plugin/weekday';
import { create } from 'zustand';
dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(timezone);
export function useDayjs(date: Parameters<typeof dayjs>[0]) {
  return dayjs(date);
}

interface DayState {
  today: Dayjs;
  utcStandardDate: Dayjs;
  selectedDate: Dayjs;
}
const today = dayjs();
const selectedDate = dayjs();
const utcStandardDate = dayjs().hour(0).subtract(9, 'hour');

const useDayState = create<DayState>()(() => ({
  today,
  selectedDate,
  utcStandardDate,
}));

export default useDayState;

export const setSelectedDate = (day: Dayjs) =>
  useDayState.setState(state => ({
    ...state,
    selectedDate: day,
  }));

export const resetSelectedDate = () =>
  useDayState.setState(state => ({
    ...state,
    selectedDate,
  }));
