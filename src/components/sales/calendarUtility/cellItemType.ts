import { CalendarDataType } from '@/types/sales';
import moment, { Moment } from 'moment';

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

export function getStatusMonthType(month: Moment, CurrentDate: Moment) {
  if (month.isSame(CurrentDate, 'M')) return MONTH['CURRENT'];
  return MONTH['NOT_CURRENT'];
}

const CALENDARTYPE = {
  CURRENT: 'CURRENT',
  NOT_CURRENT: 'NOT_CURRENT',
} as const;
export function getStatusCalendarType(month: Moment, currentDate: Moment) {
  if (month.isSame(currentDate, 'M')) return CALENDARTYPE['CURRENT'];
  if (!month.isSame(currentDate, 'M')) return CALENDARTYPE['NOT_CURRENT'];
}

const DATE = {
  CURRENT: 'CURRENT',
  PREV: 'PREV',
  AFTER: 'AFTER',
} as const;

export function getStatusDateType(day: Moment) {
  const today = moment();
  if (day.isSame(today, 'D')) return DATE['CURRENT'];
  return day.isBefore(today, 'D') ? DATE['PREV'] : DATE['AFTER'];
}

/**
 * moment().day()
 * 일요일 -  0
 * ...
 * 토요일 - 6
 */
const DAY = {
  SATURADAY: 'SATURADAY',
  SUNDAY: 'SUNDAY',
  DAY: 'DAY', // 일반 날,
} as const;
export function getStatusDayType(day: Moment) {
  if (day.day() === 6) return DAY['SATURADAY'];
  return day.day() === 0 ? DAY['SUNDAY'] : DAY['DAY'];
}

/**
 * sales/calendar일 때
 */

export function getCalendarMonthType(month: Moment, currentDate: Moment) {
  if (month.isSame(currentDate, 'M')) return MONTH['CURRENT'];
  return MONTH['NOT_CURRENT'];
}

export function getCalendarDateType(date: Moment) {
  const today = moment();
  if (date.isSame(today, 'D')) return DATE['CURRENT'];
  return date.isBefore(today, 'D') ? DATE['PREV'] : DATE['AFTER'];
}
