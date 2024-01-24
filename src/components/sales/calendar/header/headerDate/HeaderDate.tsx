import useCalendarStore from '@/shared/store/sales/calendar';
import useSalesStore from '@/shared/store/sales/sales';
import clsx from 'clsx';
import { Fragment } from 'react';
import styles from './styles/headerDate.module.css';
const HeaderDate = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  const currentDate = useCalendarStore(state => state.currentDate);
  return (
    <Fragment>
      <span className={clsx(styles.headerText, !isChangeView && styles.calendarHeaderText)}>
        <span className={clsx(styles.textYear, !isChangeView && styles.calendarTextYear)}>
          {currentDate.clone().format('YYYY년')}
        </span>
        {currentDate.clone().format('MM월')}
      </span>
    </Fragment>
  );
};

export default HeaderDate;
