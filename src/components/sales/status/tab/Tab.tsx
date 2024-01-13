import { getMonthsSales, getTodaySales, getWeekSales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import moment from 'moment';
import Calendar from './calendar/Calendar';
import styles from './styles/tab.module.css';
const Tab = () => {
  const {
    date: { currentDate, utcStandardDate },
    isShow,
    setData,
    setIsShow,
    setCurrentDate,
    setSelectedDate,
    setRecord,
  } = useManagementState();

  const clickShowCalendarHandler = () => setIsShow(true);

  const today = moment();
  const yesterDay = today.clone().subtract(1, 'day');

  const clickMoveYesterdayHandler = () => {
    if (yesterDay === currentDate) return;
    setCurrentDate(yesterDay);
    setSelectedDate(yesterDay);
  };

  const clickMoveTodayHandler = async () => {
    if (today === currentDate) return;
    const { sales, formatType } = await getTodaySales(utcStandardDate.clone());
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType);
      if (result && recordData) {
        setData(result);
        setRecord(recordData);
      }
    }
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const clickWeeksChartHandler = async () => {
    const { sales, formatType } = await getWeekSales(utcStandardDate.clone());
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType);
      if (result && recordData) {
        setData(result);
        setRecord(recordData);
      }
    }
  };

  const clickMonthsChartHandler = async () => {
    const { sales, formatType } = await getMonthsSales(utcStandardDate.clone());
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType);
      if (result && recordData) {
        setData(result);
        setRecord(recordData);
      }
    }
  };

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
