import useCalendarState from '@/shared/store/sales/salesCalendar';
import useSalesToggle from '@/shared/store/sales/salesToggle';
import clsx from 'clsx';
import { Fragment } from 'react';
import styles from './styles/headerDate.module.css';
const HeaderDate = () => {
  const isChangeView = useSalesToggle(state => state.isChangeView);
  const currentDate = useCalendarState(state => state.currentDate);
  return (
    <Fragment>
      <span className={clsx(styles.headerText, !isChangeView && styles.calendarHeaderText)}>
        <span className={clsx(styles.textYear, !isChangeView && styles.calendarTextYear)}>
          {currentDate.format('YYYY년')}
        </span>
        {currentDate.format('MM월')}
      </span>
    </Fragment>
  );
};

export default HeaderDate;
