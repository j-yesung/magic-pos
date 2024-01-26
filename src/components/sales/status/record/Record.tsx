import { convertNumberToWon } from '@/shared/helper';
import useDayState from '@/shared/store/sales/salesDay';
import useSalesRecordState from '@/shared/store/sales/salesRecord';
import { formattedRecordType } from '../../calendarUtility/recordType';
import styles from './styles/Record.module.css';

const Record = () => {
  const record = useSalesRecordState(state => state.record);
  // const selectedDate = useCalendarStore(state => state.selectedDate);
  const selectedDate = useDayState(state => state.selectedDate);

  return (
    <div className={styles.recordContainer}>
      <div className={styles.recordSalesWrapper}>
        {formattedRecordType(selectedDate, record.dateType, 'M월 D일')}의 매출은
        <span className={styles.recordSales}>{convertNumberToWon(record.currentSales)}</span>입니다.
      </div>
      <div className={styles.recordDate}>{formattedRecordType(selectedDate, record.dateType, 'YYYY년 M월 D일')}</div>
    </div>
  );
};

export default Record;
