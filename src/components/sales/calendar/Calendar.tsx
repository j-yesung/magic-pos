import useSalesToggle from '@/shared/store/sales/salesToggle';
import clsx from 'clsx';
import React from 'react';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';

const Calendar = ({ children, mode }: { children?: React.ReactNode; mode: 'mini' | 'big' }) => {
  const isChangeView = useSalesToggle(state => state.isChangeView);
  // ischangeView = false  => mini

  return (
    <div className={mode === 'mini' ? styles.salesStatus : styles.showCalendar}>
      <div className={mode === 'mini' ? styles.statusHeaderWrapper : styles.calendarHeaderWrapper}>
        <Header mode={mode} />
        {children}
      </div>

      <div className={clsx(mode === 'big' && styles.calendarBodyWrapper)}>
        <Days mode={mode} />
        <Cell mode={mode} />
      </div>
    </div>
  );
};

export default React.memo(Calendar);
