import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import Calendar from './calendar/Calendar';
import styles from './styles/tab.module.css';

const Tab = () => {
  const {
    date: { currentDate },
    isShow,
  } = useSalesStore();

  const {
    clickMoveYesterdayHandler,
    clickMoveTodayHandler,
    clickWeeksChartHandler,
    clickMonthsChartHandler,
    clickShowCalendarHandler,
  } = useCalendar();

  return (
    <div className={styles['wrapper']}>
      <div className={styles['date']}>
        <span onClick={clickMoveYesterdayHandler}>어제</span>
        <span onClick={clickMoveTodayHandler}>오늘</span>
        <span onClick={clickWeeksChartHandler}>이번 주</span>
        <span onClick={clickMonthsChartHandler}>이번 달</span>
      </div>

      {isShow ? (
        <Calendar />
      ) : (
        <span className={styles['calendar']} onClick={clickShowCalendarHandler}>
          {currentDate.format('YYYY년 MM월 DD일')}
        </span>
      )}
    </div>
  );
};

export default Tab;
