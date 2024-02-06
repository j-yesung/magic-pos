import useDayState from '@/shared/store/sales/salesDay';
import useSalesToggle, { setIsShow } from '@/shared/store/sales/salesToggle';
import React, { useCallback } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import styles from './styles/calendarToggle.module.css';

const CalendarToggle = () => {
  const isChangeView = useSalesToggle(state => state.isChangeView);
  const selectedDate = useDayState(state => state.selectedDate);
  const clickShowCalendarHandler = useCallback(() => setIsShow(true), []);
  return (
    <div className={isChangeView ? styles.calendarWrapper : styles.hiddenComponent} onClick={clickShowCalendarHandler}>
      <span className={styles.dateText}>{selectedDate?.format('YYYY-MM-DD')}</span>

      <IoCalendarClearOutline className={styles.calendarIcon} width={26} height={26} />
    </div>
  );
};

export default React.memo(CalendarToggle);
