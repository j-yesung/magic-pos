import useSalesStore from '@/shared/store/sales';
import SalesDeatilWithCalendar from './salesCalendar/SalesDetailWithCalendar';
import Status from './status/Status';
import styles from './styles/sales.module.css';

const Sales = () => {
  const { isChangeView, setIsChangeView } = useSalesStore();

  const clickShowChart = () => setIsChangeView(true);
  const clickShowCalendar = () => setIsChangeView(false);
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2>매출관리</h2>
        <div className={styles.toggleBtnWrapper}>
          <button className={isChangeView ? styles.clickedToggle : ''} onClick={clickShowChart}>
            매출관리
          </button>
          <button className={!isChangeView ? styles.clickedToggle : ''} onClick={clickShowCalendar}>
            매출달력
          </button>
        </div>
      </div>

      {isChangeView ? <SalesDeatilWithCalendar /> : <Status />}
    </div>
  );
};

export default Sales;
