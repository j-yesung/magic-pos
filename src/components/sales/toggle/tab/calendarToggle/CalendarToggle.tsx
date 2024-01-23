import { useCalendar } from '@/hooks/sales/useCalendar';
import useCalendarStore from '@/shared/store/sales/calendar';
import useSalesStore from '@/shared/store/sales/sales';
import { Moment } from 'moment';
import { useEffect, useRef } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import styles from './styles/calendarToggle.module.css';

const CalendarToggle = () => {
  const { isChangeView, isShow } = useSalesStore();
  const currentDate = useCalendarStore(state => state.currentDate);
  const { clickShowCalendarHandler } = useCalendar();

  const dateRef = useRef<Moment | null>(null);
  useEffect(() => {
    if (!dateRef.current) {
      dateRef.current = currentDate;
    }
    return () => {
      if (dateRef.current) {
        dateRef.current = null;
      }
    };
  }, [currentDate]);

  return (
    <div className={isChangeView ? styles.calendarWrapper : styles.hiddenComponent} onClick={clickShowCalendarHandler}>
      <span className={styles.dateText}>{dateRef.current?.format('YYYY-MM-DD')}</span>
      <IoCalendarClearOutline className={styles.calendarIcon} />
    </div>
  );
};

export default CalendarToggle;
