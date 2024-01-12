import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import { Tables } from '@/types/supabase';
import { useEffect } from 'react';
import ChartBar from './chart/ChartBar';
import Record from './record/Record';
import Tab from './tab/Tab';

const Status = () => {
  const {
    date: { utcStandardDate },
    setData,
  } = useManagementState();

  useEffect(() => {
    getTodaySales(utcStandardDate.clone()).then(data => {
      if (data.sales.length !== 0) {
        const { result, dateType } = formatData(data.sales as Tables<'sales'>[], data.formatType);
        if (result && dateType) {
          setData(result!);
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
