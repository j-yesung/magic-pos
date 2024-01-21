import { convertNumberToWon } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import moment, { Moment } from 'moment';
import { useEffect, useRef } from 'react';
import styles from './styles/Record.module.css';

const Record = () => {
  const {
    record,
    date: { selectedDate },
  } = useSalesStore();
  const dateRef = useRef<Moment | null>(null);
  const SALES_TYPE = {
    days: moment().isSame(dateRef.current, 'date') ? '오늘' : dateRef.current?.format('MM월 DD일'),
    weeks: '이번 주',
    month: '이번 달',
  } as const;
  useEffect(() => {
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
        {SALES_TYPE[record.dateType as keyof typeof SALES_TYPE]}의 매출은
        <span className={styles.recordSales}>{convertNumberToWon(record.currentSales)}</span>입니다.
      </div>
      <div className={styles.recordDate}>{selectedDate.format('YYYY년 M월 D일')}</div>
      <div>{/* 위 태그를 가운데로 맞추려고 일부러 넣은 div */}</div>
    </div>
  );
};

export default Record;
