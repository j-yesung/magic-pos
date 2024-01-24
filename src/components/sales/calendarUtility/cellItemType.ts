import { CalendarDataType } from '@/types/sales';
import moment, { Moment } from 'moment';

/**
 * src > component > sales 폴더에 사용될 calendar helper들 입니다.
 */
const MONTH = {
  CURRENT: 'CURRENT',
  PREV: 'PREV',
  AFTER: 'AFTER',
} as const;

// default calendar 날의 css
const CALENDARTYPE = {
  CURRENTCALENDAR: 'CURRENTCALENDAR',
  PREVCALENDAR: 'PREVCALENDAR',
} as const;

const DATE = {
  CURRENT: 'CURRENT',
  PREV: 'PREV',
  AFTER: 'AFTER',
} as const;

const DAY = {
  SATURADAY: 'SATURADAY',
  SUNDAY: 'SUNDAY',
  DAY: 'DAY', // 일반 날
} as const;

const SALES = {
  MAX: 'MAX',
  MIN: 'MIN',
  BASE: 'BASE',
} as const;

/**
 *
 * @param Month 달
 * @param CurrentDate 현재 날짜
 * @returns
 */
export function getMonthType(Month: Moment, CurrentDate: Moment) {
  const today = moment();
  if (CurrentDate.isSame(today, 'M') && Month.isSame(CurrentDate, 'M')) return MONTH['CURRENT'];
  if (!Month.isSame(CurrentDate, 'M') && CurrentDate.isSame(today, 'M'))
    return Month.isBefore(today, 'M') ? MONTH['PREV'] : MONTH['AFTER'];
}

export function getCalendarType(Month: Moment, CurrentDate: Moment) {
  if (Month.isSame(CurrentDate, 'M')) return CALENDARTYPE['CURRENTCALENDAR'];
  if (!Month.isSame(CurrentDate, 'M')) return CALENDARTYPE['PREVCALENDAR'];
}

export function getDateType(Date: Moment) {
  const today = moment();
  if (Date.isSame(today, 'D')) return DATE['CURRENT'];
  return Date.isBefore(today, 'D') ? DATE['PREV'] : DATE['AFTER'];
}

/**
 * moment().day()
 * 일요일 -  0
 * ...
 * 토요일 - 6
 */
export function getDayType(Day: Moment) {
  if (Day.day() === 6) return DAY['SATURADAY'];
  return Day.day() === 0 ? DAY['SUNDAY'] : DAY['DAY']!;
}

export function getMinMaxSalesType(salesData: CalendarDataType) {
  if (salesData?.min) return SALES['MIN'];
  if (salesData?.max) return SALES['MAX'];

  return undefined;
}
