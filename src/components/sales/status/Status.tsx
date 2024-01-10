import { supabase } from '@/shared/supabase';
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
}
const TIME_FORMAT = 'YYYY-MM-DD HH:00';

const momentToString = (date: moment.Moment, format: string) => {
  return date.format(format);
};

const Status = () => {
  const [data, setData] = useState<SalesType[]>([]);

  // const today = moment().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
  // const tomorrow = moment().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');

  const today = moment().hour(0).subtract(9, 'hour');
  const cloneToday = today.clone();

  const saleFormatData: SalesType[] = [];

  const formatData = (data: Tables<'sales'>[]) => {
    if (data) {
      const weekSales = data.reduce((acc, day) => {
        const date = moment(day.sales_date).format('dddd');
        const check = acc.findIndex(a => a.x === moment(day.sales_date).format('dddd'));

        if (check !== -1) {
          acc[check].y += day.product_price! * day.product_ea!;
          acc[check].ea += day.product_ea!;
          acc[check].category.push(day.product_category!);
        } else {
          const obj = {
            y: day.product_price! * day.product_ea! || 0,
            x: date || '',
            ea: day.product_ea || 0,
            category: [day.product_category] || [],
          };
          acc.push(obj as SalesType);
        }

        return acc;
      }, saleFormatData);

      const sortWeekSales = weekSales.sort((pre, next) => {
        if (moment().day(pre.x) < moment().day(next.x)) return 1;
        if (moment().day(pre.x) > moment().day(next.x)) return -1;
        return 0;
      });

      return sortWeekSales;
    }
  };

  const getTodaySales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(cloneToday.subtract(7, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(today, TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  const getYesterdaySales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('product_ea,product_name,product_price,sales_date')
      .gte('sales_date', momentToString(cloneToday.subtract(7, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(cloneToday, TIME_FORMAT))
      .order('sales_date');
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  const getWeekSales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('product_ea,product_name,product_price,sales_date,product_category')
      .gte('sales_date', momentToString(cloneToday.subtract(6, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(cloneToday.add(1, 'day'), TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  const getMonthSales = async () => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('product_ea,product_name,product_price,sales_date')
      .gte('sales_date', momentToString(cloneToday.startOf('month').subtract(7, 'month'), TIME_FORMAT))
      .lt('sales_date', momentToString(cloneToday.startOf('month'), TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    return { sales, error };
  };

  useEffect(() => {
    getTodaySales().then(result => {
      if (result.sales !== 0) {
        const refineData = formatData(result.sales as Tables<'sales'>[]);
        setData(refineData!);
      }
    });
  }, []);
  console.log(data);
  return (
    <div>
      <Tab />
      <ChartBar />
    </div>
  );
};

export default Status;
