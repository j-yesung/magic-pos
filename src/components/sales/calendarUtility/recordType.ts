import moment, { Moment } from 'moment';

export const formattedRecordType = (
  date: Moment | null,
  dateType: 'day' | 'week' | 'month',
  formatType: 'M월 D일' | 'YYYY년 M월 D일',
) => {
  const SALES_TYPE = {
    day: moment().isSame(date, 'date') ? '오늘' : date?.format(formatType),
    week: '이번 주',
    month: '이번 달',
  };

  return SALES_TYPE[dateType];
};
