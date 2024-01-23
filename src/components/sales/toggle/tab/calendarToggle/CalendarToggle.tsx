import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import { Moment } from 'moment';
import { useEffect, useRef } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import styles from './styles/calendarToggle.module.css';

const CalendarToggle = () => {
  const {
    isChangeView,
    isShow,
    date: { currentDate },
  } = useSalesStore();
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
  }, [isShow]);

  return (
    <div className={isChangeView ? styles.calendarWrapper : styles.hiddenComponent} onClick={clickShowCalendarHandler}>
      <span className={styles.dateText}>{dateRef.current?.format('YYYY-MM-DD')}</span>
      <IoCalendarClearOutline className={styles.calendarIcon} />
    </div>
  );
};

export default CalendarToggle;
