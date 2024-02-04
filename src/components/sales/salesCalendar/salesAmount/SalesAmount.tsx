import { convertNumberToWon } from '@/shared/helper';
import { resetCurrentDate } from '@/shared/store/sales/salesCalendar';
import useSalesDataState, { resetCalendarBindingData, resetSalesSum } from '@/shared/store/sales/salesData';
import clsx from 'clsx';
import { useEffect } from 'react';
import styles from './styles/salesAmount.module.css';
const SalesAmount = () => {
  const salesSum = useSalesDataState(state => state.salesSum);
  useEffect(() => {
    return () => {
      resetCurrentDate();
      resetCalendarBindingData();
      resetSalesSum();
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.sumSales}>
        <span> 총 매출금액 </span>
        <span>{salesSum ? convertNumberToWon(salesSum) : '없습니다.'}</span>
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
