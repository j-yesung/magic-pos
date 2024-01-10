import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ChartBar from './chart/ChartBar';
import Tab from './tab/Tab';

const TIME_FORMAT = 'YYYY-MM-DD HH:00';

const momentToString = (date: moment.Moment, format: string) => {
  return date.format(format);
};

const Status = () => {
  const [sample, setSample] = useState<Tables<'sales'>[]>([]);
  // const today = moment().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
  // const tomorrow = moment().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');

  const today = moment().hour(0).subtract(9, 'hour');

  const test = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(today, TIME_FORMAT))
      .lt('sales_date', momentToString(today.add(1, 'day'), TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };
  useEffect(() => {
    test().then(result => {
      console.log(result);
      setSample(result.sales as typeof sample);
    });
  }, []);

  return (
    <div>
      <Tab />
      <ChartBar sample={sample} />
    </div>
  );
};

export default Status;
