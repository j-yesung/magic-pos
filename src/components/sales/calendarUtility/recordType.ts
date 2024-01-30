import { DateFormatType } from '@/types/sales';
import dayjs, { Dayjs } from 'dayjs';

export const formattedRecordType = (
  date: Dayjs | null,
  dateType: DateFormatType,
  formatType: 'M월 D일' | 'YYYY년 M월 D일',
) => {
  const SALES_TYPE = {
    day: dayjs().isSame(date, 'date') ? '오늘' : date?.format(formatType),
    week: '이번 주',
    month: '이번 달',
  };

  return SALES_TYPE[dateType];
};
