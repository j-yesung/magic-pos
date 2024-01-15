import { useState } from 'react';
import SalesDeatilWithCalendar from './salesCalendar/SalesDetailWithCalendar';
import Status from './status/Status';
import styles from './styles/sales.module.css';
const Sales = () => {
  const [toggle, setToggle] = useState(false);
  const clickShowChart = () => setToggle(pre => true);
  const clickShowCalendar = () => setToggle(pre => false);
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h2>매출관리</h2>
        <div className={styles.toggleBtnWrapper}>
          <button className={toggle ? styles.clickedToggle : undefined} onClick={clickShowChart}>
            매출관리
          </button>
          <button className={!toggle ? styles.clickedToggle : undefined} onClick={clickShowCalendar}>
            매출달력
          </button>
        </div>
      </div>

      {toggle ? <Status /> : <SalesDeatilWithCalendar />}
    </div>
  );
};

export default Sales;
