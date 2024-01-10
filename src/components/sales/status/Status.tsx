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
  date: string;
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
  console.log(data);
  const saleFormatData: SalesType[] = [];

  const formatData = (data: Tables<'sales'>[]) => {
    if (data) {
      const weekSales = data.reduce((acc, sales) => {
        const day = moment(sales.sales_date).format('dddd');
        const date = moment(sales.sales_date).format('YYYY-MMMM-dddd');

        const check = acc.findIndex(a => a.x === moment(sales.sales_date).format('dddd'));

        if (check !== -1) {
          acc[check].y += sales.product_price! * sales.product_ea!;
          acc[check].ea += sales.product_ea!;
          acc[check].category.push(sales.product_category!);
        } else {
          const obj = {
            y: sales.product_price! * sales.product_ea! || 0,
            x: day || '',
            ea: sales.product_ea || 0,
            category: [sales.product_category] || [],
            date,
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
      .gte('sales_date', momentToString(cloneToday.subtract(6, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(today.clone().add(1, 'day'), TIME_FORMAT));
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
      .select('product_ea,product_name,product_price,sales_date,product_category')
      .gte('sales_date', momentToString(cloneToday.subtract(6, 'week'), TIME_FORMAT))
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

  return (
    <div>
      <Tab />
      <ChartBar />
    </div>
  );
};

export default Status;
