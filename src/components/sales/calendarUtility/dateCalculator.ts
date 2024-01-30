import dayjs, { Dayjs } from 'dayjs';

/**
 *
 * @param date dayjs객체
 * @param format 변형하고싶은 년도,월,일
 * @returns
 */
export const dayJsToString = (date: Dayjs, format: string) => {
  return date.format(format);
};

/**
 *
 * @param year
 * @returns
 */
export const getStartWeeks = (year: number) => {
  return new Array(12).fill(false).map((_, index) => dayjs().year(year).month(index).startOf('months').week());
};
