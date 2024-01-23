import { getDaySales } from '@/server/api/supabase/sales';
import useCalendarStore, { setCalendarCurrentDate, setCalendarSelectedDate } from '@/shared/store/sales/calendar';
import useSalesStore from '@/shared/store/sales/sales';
import useAuthState from '@/shared/store/session';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect } from 'react';
import { formatData } from '../calendarUtility/formatData';
import ChartBar from './chart/ChartBar';
import Record from './record/Record';
import styles from './styles/status.module.css';
const SalesStatus = () => {
  const { setData, setRecord } = useSalesStore();
  const { utcStandardDate, today } = useCalendarStore();
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
          setData(result);
          setRecord(recordData);
        }
      } else if (data.sales.length === 0) {
        setRecord({
          currentSales: 0,
          dateType: 'days',
        });
      }
    });
    return () => {
      setRecord({
        currentSales: 0,
        dateType: '',
      });
      setCalendarSelectedDate(today);
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
