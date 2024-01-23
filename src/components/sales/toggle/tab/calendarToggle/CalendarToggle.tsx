import { useCalendar } from '@/hooks/sales/useCalendar';
import useCalendarStore from '@/shared/store/sales/calendar';
import useSalesStore from '@/shared/store/sales/sales';
import { IoCalendarClearOutline } from 'react-icons/io5';
import styles from './styles/calendarToggle.module.css';

const CalendarToggle = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  const currentDate = useCalendarStore(state => state.currentDate);
  const { clickShowCalendarHandler } = useCalendar();

  return (
    <div className={isChangeView ? styles.calendarWrapper : styles.hiddenComponent} onClick={clickShowCalendarHandler}>
      <span className={styles.dateText}>{currentDate?.format('YYYY-MM-DD')}</span>
      <IoCalendarClearOutline className={styles.calendarIcon} />
    </div>
  );
};

export default CalendarToggle;
