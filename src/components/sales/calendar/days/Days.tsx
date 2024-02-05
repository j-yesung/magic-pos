import { CalendarModeType } from '@/types/calendar';
import clsx from 'clsx';
import { BIG_MODE, MINI_MODE } from '../calendarType/calendarType';
import styles from './styles/days.module.css';
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Days = ({ mode }: { mode: CalendarModeType }) => {
  return (
    <div
      className={clsx({
        [styles.miniDays]: mode === MINI_MODE,
        [styles.bigCalendarDays]: mode === BIG_MODE,
      })}
    >
      {DAYS.map((day, idx) => (
        <span
          key={day + idx}
          className={clsx({
            [styles.miniDay]: mode === MINI_MODE,
            [styles.bigCalendarDay]: mode === BIG_MODE,
          })}
        >
          <span
            className={clsx({
              [styles.miniDayText]: mode === MINI_MODE,
            })}
          >
            {day}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Days;
