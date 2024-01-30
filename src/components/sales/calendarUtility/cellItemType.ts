import { CalendarDataType } from '@/types/sales';
import dayjs, { Dayjs } from 'dayjs';

const SALES = {
  MAX: 'MAX',
  MIN: 'MIN',
} as const;

export function getMinMaxSalesType(salesData: CalendarDataType) {
  if (salesData?.min) return SALES['MIN'];
  if (salesData?.max) return SALES['MAX'];

  return undefined;
}
/**
 * Status Calendar의 month type
 */
const MONTH = {
  CURRENT: 'CURRENT',
  NOT_CURRENT: 'NOT_CURRENT',
} as const;

export function getStatusMonthType(month: Dayjs, CurrentDate: Dayjs) {
  if (month.isSame(CurrentDate, 'M')) return MONTH['CURRENT'];
  return MONTH['NOT_CURRENT'];
}

const CALENDARTYPE = {
  CURRENT: 'CURRENT',
  NOT_CURRENT: 'NOT_CURRENT',
} as const;
export function getStatusCalendarType(month: Dayjs, currentDate: Dayjs) {
  if (month.isSame(currentDate, 'M')) return CALENDARTYPE['CURRENT'];
  if (!month.isSame(currentDate, 'M')) return CALENDARTYPE['NOT_CURRENT'];
}

const DATE = {
  CURRENT: 'CURRENT',
  PREV: 'PREV',
  AFTER: 'AFTER',
} as const;

export function getStatusDateType(day: Dayjs) {
  const today = dayjs();
  if (day.isSame(today, 'D')) return DATE['CURRENT'];
  return day.isBefore(today, 'D') ? DATE['PREV'] : DATE['AFTER'];
}

/**
 * dayjs().day()
 * 일요일 -  0
 * ...
 * 토요일 - 6
 */
const DAY = {
  SATURADAY: 'SATURADAY',
  SUNDAY: 'SUNDAY',
  DAY: 'DAY', // 일반 날,
} as const;
export function getStatusDayType(day: Dayjs) {
  if (day.day() === 6) return DAY['SATURADAY'];
  return day.day() === 0 ? DAY['SUNDAY'] : DAY['DAY'];
}

/**
 * sales/calendar일 때
 */

export function getCalendarMonthType(month: Dayjs, currentDate: Dayjs) {
  if (month.isSame(currentDate, 'M')) return MONTH['CURRENT'];
  return MONTH['NOT_CURRENT'];
}

export function getCalendarDateType(date: Dayjs) {
  const today = dayjs();
  if (date.isSame(today, 'D')) return DATE['CURRENT'];
  return date.isBefore(today, 'D') ? DATE['PREV'] : DATE['AFTER'];
}

// Cell, CellITEM 에서 쓰이는 FORMAT TYPE 입니다.
export const FORMAT_CELL_DATE_TYPE = 'YYYY. MM. DD';
