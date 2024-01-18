import { convertNumberToWon } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import styles from './styles/salesAmount.module.css';
const SalesAmount = () => {
  const { salesSum } = useSalesStore();
  return (
    <div className={styles.container}>
      <div className={styles.salesGrade}>
        <span className={clsx(styles.gradeColor, styles.gradeMax)}>매출 최고액</span>
        <span className={clsx(styles.gradeColor, styles.gradeMin)}>매출 최저액</span>
      </div>
      <div>매출금액</div>
      <div className={styles.sumSales}>
        <span> 총 매출금액 </span>
        <span>{salesSum && convertNumberToWon(salesSum)}</span>
      </div>
    </div>
  );
};

export default SalesAmount;
