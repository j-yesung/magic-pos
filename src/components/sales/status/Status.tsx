import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ChartBar from './chart/ChartBar';
import Tab from './tab/Tab';

export interface SalesType {
  y: number;
  x: string;
  ea: number;
  category: string[];
  date: string;
}

const Status = () => {
  const [data, setData] = useState<{ x: string; y: number }[]>([]);

  const today = moment().hour(0).subtract(9, 'hour');
  const cloneToday = today.clone();

  useEffect(() => {
    getTodaySales(today.clone(), today.clone()).then(result => {
      if (result.sales.length !== 0) {
        const refineData = formatData(result.sales as Tables<'sales'>[], result.formatType);
        setData(refineData!);
      }
    });
  }, []);
  return (
    <div>
      <Tab setData={setData} />
      <ChartBar data={data} />
    </div>
  );
};

export default Status;
