import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import Calendar from '../../calendar/Calendar';
import Record from '../record/Record';
import styles from './styles/tab.module.css';

const Tab = () => {
  const {
    date: { currentDate },
    isShow,
    setIsShow,
  } = useSalesStore();

  const { clickMoveTodayHandler, clickWeeksChartHandler, clickMonthsChartHandler, clickShowCalendarHandler } =
    useCalendar();

  const clickCloseCalendar = () => setIsShow(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.dateWrapper}>
        <span className={styles.dateButton} onClick={clickMoveTodayHandler}>
          오늘
        </span>
        <span className={styles.dateButton} onClick={clickWeeksChartHandler}>
          이번 주
        </span>
        <span className={styles.dateButton} onClick={clickMonthsChartHandler}>
          이번 달
        </span>
      </div>
      <Record />

      {isShow && <div className={styles.calendarBg} onClick={clickCloseCalendar}></div>}
      {isShow ? (
        <Calendar />
      ) : (
        <div className={styles.calendarWrapper} onClick={clickShowCalendarHandler}>
          <div className={styles.calendarIcon}>{currentDate.clone().format('YYYY년 MM월 DD일')} icon자리</div>
        </div>
      )}
    </div>
  );
};

export default Tab;
