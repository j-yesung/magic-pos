import styles from './styles/noneSales.module.css';
const NoneSales = () => {
  return (
    <div className={styles.noneContainer}>
      <span className={styles.noneSales}>매출 내역이 없습니다.</span>
    </div>
  );
};

export default NoneSales;
