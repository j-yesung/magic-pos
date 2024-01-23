import useSalesStore from '@/shared/store/sales';
import { Fragment, useEffect } from 'react';
import Calendar from '../../calendar/Calendar';
import CalendarToggle from './calendarToggle/CalendarToggle';
import styles from './styles/tab.module.css';
import TabButton from './tabButton/TabButton';
const Tab = () => {
  const { isShow, setIsShow } = useSalesStore();

  const clickCloseCalendar = () => setIsShow(false);

  useEffect(() => {
    /*reset*/
    return () => {
      setIsShow(false);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <TabButton />
      <CalendarToggle />
      {isShow && (
        <Fragment>
          <div className={styles.calendarBg} onClick={clickCloseCalendar} />
          <Calendar />
        </Fragment>
      )}
    </div>
  );
};

export default Tab;
