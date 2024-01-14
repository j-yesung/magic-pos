import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect } from 'react';
import ChartBar from './chart/ChartBar';
import Record from './record/Record';
import Tab from './tab/Tab';

const Status = () => {
  const {
    date: { utcStandardDate },
    setData,
    setRecord,
  } = useSalesStore();

  useEffect(() => {
    getTodaySales(utcStandardDate.clone()).then(data => {
      if (data.sales.length !== 0) {
        const { result, recordData } = formatData(data.sales as Tables<'sales'>[], data.formatType, moment());
        if (result) {
          setData(result);
          setRecord(recordData);
        }
      }
    });
  }, []);

  return (
    <div>
      <Tab />
      <Record />
      <ChartBar />
    </div>
  );
};

export default Status;
