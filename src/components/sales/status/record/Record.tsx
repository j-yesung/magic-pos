import { convertNumberToWon } from '@/shared/helper';
import useCalendarStore from '@/shared/store/sales/calendar';
import useRecordStore from '@/shared/store/sales/record';
import { Moment } from 'moment';
import { useEffect, useRef } from 'react';
import { formattedRecordType } from '../../calendarUtility/recordType';
import styles from './styles/Record.module.css';

const Record = () => {
  const record = useRecordStore(state => state.record);
  const selectedDate = useCalendarStore(state => state.selectedDate);
  const dateRef = useRef<Moment | null>(null);

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

  return (
    <div className={styles.recordContainer}>
      <div className={styles.recordSalesWrapper}>
        {formattedRecordType(dateRef.current, record.dateType, 'M월 D일')}의 매출은
        <span className={styles.recordSales}>{convertNumberToWon(record.currentSales)}</span>입니다.
      </div>
      <div className={styles.recordDate}>{formattedRecordType(dateRef.current, record.dateType, 'YYYY년 M월 D일')}</div>
      <div>{/* 위 태그를 가운데로 맞추려고 일부러 넣은 div */}</div>
    </div>
  );
};

export default Record;
