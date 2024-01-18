import { convertNumberToWon } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import styles from './styles/salesAmount.module.css';
const SalesAmount = () => {
  const { salesSum } = useSalesStore();

  return (
    <div className={styles.container}>
      <div>매출금액</div>
      <div className={styles.sumSales}>
        <span> 총 매출금액 </span>
        <span>{salesSum && convertNumberToWon(salesSum)}</span>
      </div>
    </div>
  );
};

export default SalesAmount;
