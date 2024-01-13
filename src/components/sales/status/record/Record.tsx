import { convertNumberToWon } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import moment from 'moment';
import styles from './styles/Record.module.css';

const Record = () => {
  const {
    record,
    date: { currentDate },
  } = useSalesStore();
  console.log(record);
  const SALES_TYPE = {
    days: moment().isSame(currentDate, 'date') ? '오늘' : currentDate.format('MM월 DD일'),
    weeks: '이번 주',
    month: '이번 달',
  } as const;

  return (
    <div className={styles['container']}>
      {SALES_TYPE[record.dateType as keyof typeof SALES_TYPE]}의 매출은 {convertNumberToWon(record.currentSales)}
    </div>
  );
};

export default Record;
