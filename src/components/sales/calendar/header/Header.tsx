import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import styles from './styles/header.module.css';
import ArrowLeft from '/public/icons/calendar-arrow-left.svg';
import ArrowRight from '/public/icons/calendar-arrow-right.svg';
const Header = () => {
  const {
    isChangeView,
    date: { currentDate },
  } = useSalesStore();
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();

  return (
    <div className={clsx(styles.header, isChangeView ? styles.statusHeader : styles.calendarHeader)}>
      <div className="wrapper">
        <span className={clsx(styles.headerText, !isChangeView && styles.calendarHeaderText)}>
          <span className={clsx(styles.textYear, !isChangeView && styles.calendarTextYear)}>
            {currentDate.clone().format('YYYY년')}
          </span>
          {currentDate.clone().format('MM월')}
        </span>
      </div>

      <div className={clsx(styles.btnGroup, !isChangeView && styles.calendarBtnGroup)}>
        <span className={clsx(!isChangeView && styles.calendarBtn)} onClick={clickPreMonthHandler}>
          <ArrowLeft />
        </span>
        <span className={clsx(!isChangeView && styles.calendarBtn)} onClick={clickNextMonthHandler}>
          <ArrowRight />
        </span>
      </div>
    </div>
  );
};

export default Header;
