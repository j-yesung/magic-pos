import { useCalendar } from '@/hooks/sales/useCalendar';
import useDayState from '@/shared/store/sales/day';
import useSalesStore from '@/shared/store/sales/sales';
import { IoCalendarClearOutline } from 'react-icons/io5';
import styles from './styles/calendarToggle.module.css';

const CalendarToggle = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  const selectedDate = useDayState(state => state.selectedDate);
  const { clickShowCalendarHandler } = useCalendar();

  return (
    <div className={isChangeView ? styles.calendarWrapper : styles.hiddenComponent} onClick={clickShowCalendarHandler}>
      <span className={styles.dateText}>{selectedDate?.format('YYYY-MM-DD')}</span>
      <IoCalendarClearOutline className={styles.calendarIcon} />
    </div>
  );
};

export default CalendarToggle;
