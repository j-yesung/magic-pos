import moment from 'moment';

/**
 *
 * @param date moment객체
 * @param format 변형하고싶은 년도,월,일
 * @returns
 */
export const momentToString = (date: moment.Moment, format: string) => {
  return date.format(format);
};

/**
 *
 * @param year
 * @returns
 */
export const getStartWeeks = (year: number) => {
  return new Array(12).fill(false).map((_, index) => moment().year(year).month(index).startOf('months').week());
};
