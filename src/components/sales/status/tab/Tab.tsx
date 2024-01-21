import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import { Moment } from 'moment';
import { Fragment, useEffect, useRef, useState } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Calendar from '../../calendar/Calendar';
import styles from './styles/tab.module.css';
const Tab = () => {
  const TODAY = 'today';
  const MONTHS = 'months';
  const WEEKS = 'weeks';
  const {
    date: { currentDate },
    isShow,
    setIsShow,
  } = useSalesStore();

  const { clickMoveTodayHandler, clickWeeksChartHandler, clickMonthsChartHandler, clickShowCalendarHandler } =
    useCalendar();

  const clickCloseCalendar = () => setIsShow(false);
  const [clickedTab, setClickedTab] = useState(TODAY);

  const dateRef = useRef<Moment | null>(null);

  useEffect(() => {
    return () => {
      setClickedTab(TODAY);
    };
  }, []);

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
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>
        <span
          className={clsx(styles.dateButton, {
            [styles.active]: clickedTab === TODAY,
          })}
          onClick={async () => {
            await clickMoveTodayHandler().then(() => setClickedTab(TODAY));
          }}
        >
          오늘
        </span>
        <span
          className={clsx(styles.dateButton, {
            [styles.active]: clickedTab === WEEKS,
          })}
          onClick={async () => await clickWeeksChartHandler().then(() => setClickedTab(WEEKS))}
        >
          이번 주
        </span>
        <span
          className={clsx(styles.dateButton, {
            [styles.active]: clickedTab === MONTHS,
          })}
          onClick={async () => clickMonthsChartHandler().then(() => setClickedTab(MONTHS))}
        >
          이번 달
        </span>
      </div>

      {isShow && (
        <Fragment>
          <div className={styles.calendarBg} onClick={clickCloseCalendar}></div>
          <Calendar />
        </Fragment>
      )}

      {!isShow && (
        <div className={styles.calendarWrapper} onClick={clickShowCalendarHandler}>
          <span className={styles.dateText}>{dateRef.current?.format('YYYY-MM-DD')}</span>

          <IoCalendarClearOutline className={styles.calendarIcon} />
        </div>
      )}
    </div>
  );
};

export default Tab;
