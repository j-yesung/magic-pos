import { convertNumberToWon } from '@/shared/helper';
import useDataStore from '@/shared/store/sales/data';
import clsx from 'clsx';
import styles from './styles/salesAmount.module.css';
const SalesAmount = () => {
  const salesSum = useDataStore(state => state.salesSum);

  return (
    <div className={styles.container}>
      <div className={styles.sumSales}>
        <span> 총 매출금액 </span>
        <span>{salesSum ? convertNumberToWon(salesSum) : '없네용 ㅜㅜ'}</span>
      </div>
      <div className={styles.salesGrade}>
        <span className={clsx(styles.gradeColor, styles.gradeMax)}>최고 매출일</span>
        <span className={clsx(styles.gradeColor, styles.gradeMin)}>최저 매출일</span>
        <span className={clsx(styles.gradeColor, styles.gradeHoliday)}>미영업일</span>
      </div>
    </div>
  );
};

export default SalesAmount;
