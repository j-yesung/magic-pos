import { getDaySales } from '@/server/api/supabase/sales';
import { setCalendarCurrentDate } from '@/shared/store/sales/calendar';
import { setChartData } from '@/shared/store/sales/chart';
import useDayState, { resetSelectedDate } from '@/shared/store/sales/day';
import { resetRecordData, setRecordData } from '@/shared/store/sales/record';
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
        setRecordData({
          currentSales: 0,
          dateType: 'day',
        });
      }
    });
  }, []);

  // reset 하는 함수들
  useEffect(() => {
    return () => {
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
