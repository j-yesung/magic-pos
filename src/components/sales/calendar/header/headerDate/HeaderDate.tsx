import useCalendarState from '@/shared/store/sales/salesCalendar';

import { CalendarModeType } from '@/types/calendar';
import clsx from 'clsx';
import { BIG_MODE, MONTH_FORMAT_TYPE, YEAR_FORMAT_TYPE } from '../../calendarType/calendarType';
import styles from './styles/headerDate.module.css';
const HeaderDate = ({ mode }: { mode: CalendarModeType }) => {
  const currentDate = useCalendarState(state => state.currentDate);
  return (
    <span
      className={clsx(styles.headerText, {
        [styles.calendarHeaderText]: mode === BIG_MODE,
      })}
    >
      <span
        className={clsx(styles.baseTextYear, {
          [styles.bigTextYear]: mode === BIG_MODE,
        })}
      >
        {currentDate.format(YEAR_FORMAT_TYPE)}
      </span>
      {currentDate.format(MONTH_FORMAT_TYPE)}
    </span>
  );
};

export default HeaderDate;
