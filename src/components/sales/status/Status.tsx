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
  const cloneToday = today.clone();

  const getTodaySales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(cloneToday, TIME_FORMAT))
      .lt('sales_date', momentToString(cloneToday.add(1, 'day'), TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  const getYesterdaySales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('product_ea,product_name,product_price,sales_date')
      .gte('sales_date', momentToString(cloneToday.subtract(1, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(today, TIME_FORMAT))
      .order('sales_date');
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  const getWeekSales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('product_ea,product_name,product_price,sales_date')
      .gte('sales_date', momentToString(cloneToday.subtract(7, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(today, TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  const getMonthSales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('product_ea,product_name,product_price,sales_date')
      .gte('sales_date', momentToString(cloneToday.startOf('month'), TIME_FORMAT))
      .lt('sales_date', momentToString(today, TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  useEffect(() => {
    getMonthSales().then(result => {
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
