import { useFetchDayQuery } from '@/hooks/query/sales/useFetchQuery';
import { setCalendarCurrentDate } from '@/shared/store/sales/salesCalendar';
import { resetChartData, setChartData } from '@/shared/store/sales/salesChart';
import useDayState, { resetSelectedDate } from '@/shared/store/sales/salesDay';
import { resetRecordData, setRecordData } from '@/shared/store/sales/salesRecord';
import useAuthState from '@/shared/store/session';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { formatData } from '../calendarUtility/formatData';
import ChartBar from './chart/ChartBar';
import Record from './record/Record';
import styles from './styles/status.module.css';
const SalesStatus = () => {
  const today = useDayState(state => state.today);
  const storeId = useAuthState(state => state.storeId);
  const { data, isLoading } = useFetchDayQuery(today, storeId ?? '');

  useEffect(() => {
    if (isLoading || !data) return;
    if (data.sales.length !== 0) {
      const { result, recordData } = formatData(
        data.sales as Tables<'sales'>[],
        data.dateType,
        dayjs(),
        data.formatType!,
      );
      if (result) {
        setChartData(result ?? null);
        setRecordData(recordData);
      }
    }
    if (data.sales.length === 0) {
      resetChartData();
      setRecordData({
        currentSales: 0,
        dateType: 'day',
      });
    }
  }, [isLoading]);

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
