import { convertNumberToWon } from '@/shared/helper';
import useCalendarStore from '@/shared/store/sales/calendar';
import useRecordStore from '@/shared/store/sales/record';
import moment, { Moment } from 'moment';
import { useEffect, useRef } from 'react';
import styles from './styles/Record.module.css';

const Record = () => {
  const record = useRecordStore(state => state.record);
  const selectedDate = useCalendarStore(state => state.selectedDate);
  const dateRef = useRef<Moment | null>(null);

  const formattedType = (dateType: 'day' | 'week' | 'month', formatType: 'M월 D일' | 'YYYY년 M월 D일') => {
    const SALES_TYPE = {
      day: moment().isSame(dateRef.current, 'date') ? '오늘' : dateRef.current?.format(formatType),
      week: '이번 주',
      month: '이번 달',
    };

    return SALES_TYPE[dateType];
  };
  useEffect(() => {
    console.log('dffffffffffffffff');
    if (!dateRef.current) {
      dateRef.current = selectedDate;
    }
    return () => {
      if (dateRef.current) {
        dateRef.current = null;
      }
    };
  }, [selectedDate]);
  console.log(record);
  return (
    <div className={styles.recordContainer}>
      <div className={styles.recordSalesWrapper}>
        {formattedType(record.dateType, 'M월 D일')}의 매출은
        <span className={styles.recordSales}>{convertNumberToWon(record.currentSales)}</span>입니다.
      </div>
      <div className={styles.recordDate}>{formattedType(record.dateType, 'YYYY년 M월 D일')}</div>
      <div>{/* 위 태그를 가운데로 맞추려고 일부러 넣은 div */}</div>
    </div>
  );
};

export default Record;
