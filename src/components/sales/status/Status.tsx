import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import { Tables } from '@/types/supabase';
import { useEffect } from 'react';
import ChartBar from './chart/ChartBar';
import Tab from './tab/Tab';

const Status = () => {
  const {
    date: { utcStandardDate },
    setData,
  } = useManagementState();

  useEffect(() => {
    getTodaySales(utcStandardDate.clone()).then(result => {
      if (result.sales.length !== 0) {
        const refineData = formatData(result.sales as Tables<'sales'>[], result.formatType);
        setData(refineData!);
      }
    });
  }, []);

  return (
    <div>
      <Tab />
      <ChartBar />
    </div>
  );
};

export default Status;
