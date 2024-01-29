import { getDaySales } from '@/server/api/supabase/sales';
import { setCalendarCurrentDate } from '@/shared/store/sales/salesCalendar';
import { resetChartData, setChartData } from '@/shared/store/sales/salesChart';
import useDayState, { resetSelectedDate } from '@/shared/store/sales/salesDay';
import { resetRecordData, setRecordData } from '@/shared/store/sales/salesRecord';
import useAuthState from '@/shared/store/session';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect } from 'react';
import { formatData } from '../calendarUtility/formatData';
import ChartBar from './chart/ChartBar';
import Record from './record/Record';
import styles from './styles/status.module.css';
const SalesStatus = () => {
  const { utcStandardDate, today } = useDayState();
  const storeId = useAuthState(state => state.storeId);
  useEffect(() => {
    getDaySales(utcStandardDate.clone(), storeId!).then(data => {
      if (data.sales.length !== 0) {
        const { result, recordData } = formatData(
          data.sales as Tables<'sales'>[],
          data.dateType,
          moment(),
          data.formatType!,
        );
        if (result) {
          setChartData(result);
          setRecordData(recordData);
        }
      } else if (data.sales.length === 0) {
        resetChartData();
        setRecordData({
          currentSales: 0,
          dateType: 'day',
        });
      }
    });
  }, []);
  console.log(moment('2024-01-09T14:46:43+00:00').format('YY MM DD HH'));
  // reset 하는 함수들
  useEffect(() => {
    return () => {
      resetChartData();
      resetRecordData();
      resetSelectedDate();
      setCalendarCurrentDate(today);
    };
  }, []);

  return (
    <div className={styles.statusContainer}>
      <Record />
      <ChartBar />
    </div>
  );
};

export default SalesStatus;
