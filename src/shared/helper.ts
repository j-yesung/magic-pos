import { CalendarDataType } from '@/components/sales/calendar/cell/Cell';
import moment, { Moment } from 'moment';

/**
 * 해당 객체가 빈 객체인지 판단
 * @param obj
 */
export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

/**
 * 숫자를 화폐 형식(원) 문자열로 바꿉니다.
 * @param num
 */
export const convertNumberToWon = (num: number) => {
  return `${new Intl.NumberFormat('ko-KO', { style: 'decimal', currency: 'KRW' }).format(num)}원`;
};

/**
 * 하나 이상의 키를 가지는 객체를 담고 있는 배열을 지정한 키를 기준으로 그룹화하여 객체로 반환합니다.
 * [{name: 'lee', age: 1}, {name: 'lee', age: 10}, {name: 'kim', age: 12}]   => {'lee': [{name: 'lee', age: 1}, {name: 'lee', age: 10}], 'kim': [{name: 'kim', age: 12}]}
 * @param arr 객체의 배열
 * @param key 그룹화의 기준이 될 Key
 */
export const groupByKey = <T extends { [key: string | number]: unknown }>(arr: T[], key: keyof T) => {
  return arr.reduce((acc, cur) => {
    const stringKey = String(cur[key]);
    if (acc.get(stringKey)) acc.get(stringKey)?.push(cur);
    else acc.set(stringKey, [cur]);
    return acc;
  }, new Map<string, T[]>());
};

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

export type GetMinMaxSalesReturnType = 'MAX' | 'MIN' | undefined;

export function getMinMaxSalesType(salesData: CalendarDataType) {
  if (salesData?.min) return SALES['MIN'];
  if (salesData?.max) return SALES['MAX'];

  return undefined;
}
