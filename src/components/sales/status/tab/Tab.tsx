import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import { Fragment, useEffect, useState } from 'react';
import Calendar from '../../calendar/Calendar';
import Record from '../record/Record';
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
  useEffect(() => {
    return () => {
      setClickedTab(TODAY);
    };
  }, []);
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
      <Record />

      {isShow && (
        <Fragment>
          <div className={styles.calendarBg} onClick={clickCloseCalendar}></div>
          <Calendar />
        </Fragment>
      )}

      {!isShow && (
        <>
          <div className={styles.calendarWrapper} onClick={clickShowCalendarHandler}>
            <div className={styles.calendarIcon}>{currentDate.clone().format('YYYY년 MM월 DD일')} icon자리</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tab;
