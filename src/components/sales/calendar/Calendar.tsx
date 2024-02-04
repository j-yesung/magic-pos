import clsx from 'clsx';
import React from 'react';
import { BIG_MODE, MINI_MODE } from './calendarType/calendarType';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';

const Calendar = ({
  children,
  mode,
  page,
}: {
  children?: React.ReactNode;
  mode: CalendarModeType;
  page: CalendarPageType;
}) => {
  // ischangeView = false  => mini

  return (
    <div
      className={clsx({
        [styles.salesStatus]: mode === MINI_MODE,
        [styles.showCalendar]: mode === BIG_MODE,
      })}
    >
      <div
        className={clsx({
          [styles.statusHeaderWrapper]: mode === MINI_MODE,
          [styles.calendarHeaderWrapper]: mode === BIG_MODE,
        })}
      >
        <Header mode={mode} />
        {children}
      </div>

      <div
        className={clsx({
          [styles.calendarBodyWrapper]: mode === BIG_MODE,
        })}
      >
        <Days mode={mode} />
        <Cell mode={mode} page={page} />
      </div>
    </div>
  );
};

export default React.memo(Calendar);
