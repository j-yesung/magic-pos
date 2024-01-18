import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import styles from './styles/header.module.css';

const Header = () => {
  const {
    isChangeView,
    date: { currentDate },
  } = useSalesStore();
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();

  return (
    <div className={clsx(styles.header, isChangeView ? styles.statusHeader : styles.calendarHeader)}>
      <div className="wrapper">
        <span className={styles.headerText}>
          <span className={styles.textYear}>{currentDate.clone().format('YYYY년')}</span>
          {currentDate.clone().format('MM월')}
        </span>
      </div>

      <div className={styles.btnGroup}>
        <span onClick={clickPreMonthHandler}>&lt;</span>
        <span onClick={clickNextMonthHandler}>&gt;</span>
      </div>
    </div>
  );
};

export default Header;
