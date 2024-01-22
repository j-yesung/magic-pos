import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import SalesDeatilWithCalendar from './salesCalendar/SalesDetailWithCalendar';
import Status from './status/Status';
import styles from './styles/sales.module.css';

const Sales = () => {
  const { isChangeView, setIsChangeView } = useSalesStore();

  const clickShowChart = () => setIsChangeView(true);
  const clickShowCalendar = () => setIsChangeView(false);
  return (
    <div className={styles.salesContainer}>
      <div
        className={clsx(styles.titleWrapper, {
          [styles.salesCalendar]: !isChangeView,
        })}
      >
        <div className={styles.toggleBtnWrapper}>
          <button
            className={clsx(styles.toggleButton, { [styles.clickedToggle]: isChangeView })}
            onClick={clickShowChart}
          >
            매출관리
          </button>
          <button
            className={clsx(styles.toggleButton, { [styles.clickedToggle]: !isChangeView })}
            onClick={clickShowCalendar}
          >
            매출달력
          </button>
        </div>
      </div>
      {isChangeView ? <Status /> : <SalesDeatilWithCalendar />}
    </div>
  );
};

export default Sales;
