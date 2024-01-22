import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import useAuthState from '@/shared/store/session';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect } from 'react';
import ChartBar from './chart/ChartBar';
import Record from './record/Record';
import styles from './styles/status.module.css';
import Tab from './tab/Tab';
const Status = () => {
  const {
    date: { utcStandardDate, today },
    setData,
    setRecord,
    setSelectedDate,
    setCurrentDate,
  } = useSalesStore();
  const storeId = useAuthState(state => state.storeId);
  useEffect(() => {
    getTodaySales(utcStandardDate.clone(), storeId!).then(data => {
      if (data.sales.length !== 0) {
        const { result, recordData } = formatData(data.sales as Tables<'sales'>[], data.formatType, moment());
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
      setSelectedDate(today);
      setCurrentDate(today);
    };
  }, []);

  return (
    <div className={styles.statusContainer}>
      <Tab />
      <Record />
      <ChartBar />
    </div>
  );
};

export default Status;
