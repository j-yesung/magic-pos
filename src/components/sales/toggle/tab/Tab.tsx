import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesToggle from '@/shared/store/sales/salesToggle';
import React, { Fragment, useEffect } from 'react';
import Calendar from '../../calendar/Calendar';
import Csv from '../../csv/Csv';
import CalendarToggle from './calendarToggle/CalendarToggle';
import styles from './styles/tab.module.css';
import TabButton from './tabButton/TabButton';
const Tab = () => {
  const isShow = useSalesToggle(state => state.isShow);
  const { clickHiddenCalendarHandler } = useCalendar();
  const isChangeView = useSalesToggle(state => state.isChangeView);
  useEffect(() => {
    /*reset*/
    return () => {
      clickHiddenCalendarHandler();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {isChangeView && <TabButton />}
      <CalendarToggle />
      {isShow && (
        <Fragment>
          <div className={styles.calendarBg} onClick={clickHiddenCalendarHandler} />
          <Calendar mode={'mini'} />
        </Fragment>
      )}
      {isChangeView && <Csv />}
    </div>
  );
};

export default React.memo(Tab);
