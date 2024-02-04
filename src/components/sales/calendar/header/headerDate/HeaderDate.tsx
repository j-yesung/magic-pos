import useCalendarState from '@/shared/store/sales/salesCalendar';

import clsx from 'clsx';
import { Fragment } from 'react';
import { BIG_MODE, MONTH_FORMAT_TYPE, YEAR_FORMAT_TYPE } from '../../calendarType/calendarType';
import styles from './styles/headerDate.module.css';
const HeaderDate = ({ mode }: { mode: CalendarModeType }) => {
  const currentDate = useCalendarState(state => state.currentDate);
  return (
    <Fragment>
      <span
        className={clsx(styles.headerText, {
          [styles.calendarHeaderText]: mode === BIG_MODE,
        })}
      >
        <span
          className={clsx(styles.textYear, {
            [styles.calendarTextYear]: mode === BIG_MODE,
          })}
        >
          {currentDate.format(YEAR_FORMAT_TYPE)}
        </span>
        {currentDate.format(MONTH_FORMAT_TYPE)}
      </span>
    </Fragment>
  );
};

export default HeaderDate;
