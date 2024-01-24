import { convertNumberToWon } from '@/shared/helper';
import useCalendarStore from '@/shared/store/sales/calendar';
import useRecordStore from '@/shared/store/sales/record';
import { formattedRecordType } from '../../calendarUtility/recordType';
import styles from './styles/Record.module.css';

const Record = () => {
  const record = useRecordStore(state => state.record);
  // const selectedDate = useCalendarStore(state => state.selectedDate);
  const currentDate = useCalendarStore(state => state.currentDate);

  return (
    <div className={styles.recordContainer}>
      <div className={styles.recordSalesWrapper}>
        {formattedRecordType(currentDate, record.dateType, 'M월 D일')}의 매출은
        <span className={styles.recordSales}>{convertNumberToWon(record.currentSales)}</span>입니다.
      </div>
      <div className={styles.recordDate}>{formattedRecordType(currentDate, record.dateType, 'YYYY년 M월 D일')}</div>
    </div>
  );
};

export default Record;
