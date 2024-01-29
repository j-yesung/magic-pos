import styles from './styles/salesProduct.module.css';
const NoneHistory = () => {
  return (
    <div className={styles.noneSaleContainer}>
      <p className={styles.noneSaleText}>주문 내역이 없습니다.</p>
    </div>
  );
};

export default NoneHistory;
