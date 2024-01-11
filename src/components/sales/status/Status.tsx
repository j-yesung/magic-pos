import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';
import moment, { Moment } from 'moment';
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

  const saleFormatData: SalesType[] = [];

  const getCurrentDate = (data: Tables<'sales'>, current: string) => {
    const date = moment(data.sales_date).format('YYYY MMMM DD');

    if ('오늘' === current) {
      const day = moment(data.sales_date).format('dddd');

      return { day, date };
    }
    if ('어제' === current) {
      const day = moment(data.sales_date).format('MMMM DDD');
      console.log('adf');
      return { day, date };
    }
    if ('요번주' === current) {
      const day = `${moment(data.sales_date).format('MMMM')} ${
        moment(data.sales_date).week() - moment(today).startOf('month').week() + 1
      }주차`; // 몇 월 몇주차
      const date = moment(data.sales_date).format('MMMM DDDD');

      return { day, date };
    }
    if ('요번달' === current) {
      const day = moment(data.sales_date).format('');
      const date = moment(data.sales_date);
    }
    return null;
  };

  const formatData = (data: Tables<'sales'>[], currentDay: Moment) => {
    if (data) {
      const weekSales = data.reduce((acc, sales) => {
        const day = moment(sales.sales_date).format('MMMM');
        const date = moment(sales.sales_date).format('YYYY-MMMM');
        const test = getCurrentDate(sales, '오늘');
        console.log(test);
        // const arr = data.map(d => {
        //   return { ...d, sales_date: moment(d.sales_date).format('YYYY-MMMM') };
        // });

        // const group = groupByKey(arr, 'sales_date');
        // console.log(
        //   group.forEach(value => {
        //     console.log(value);
        //   }),
        // );

        // console.log(moment(sales.sales_date).month()); //0 : 1월 ~ 11: 12월로 표기
        // // console;
        // // console.log(moment(sales.sales_date).week());
        const check = acc.findIndex(a => a.x === moment(sales.sales_date).format('dddd'));

        if (check !== -1) {
          acc[check].y += sales.product_price! * sales.product_ea!;
          acc[check].ea += sales.product_ea!;
          acc[check].category.push(sales.product_category!);
        } else {
          const refineSales = {
            y: sales.product_price! * sales.product_ea! || 0,
            x: day,
            ea: sales.product_ea || 0,
            category: [sales.product_category] || [],
            date,
          };
          acc.push(refineSales as SalesType);
        }

        return acc;
      }, saleFormatData);

      const sortWeekSales = weekSales.sort((pre, next) => {
        if (moment().day(pre.x) < moment().day(next.x)) return 1;
        if (moment().day(pre.x) > moment().day(next.x)) return -1;
        return 0;
      });

      return weekSales;
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
      .gte('sales_date', momentToString(cloneToday.subtract(6, 'day'), TIME_FORMAT))
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
      .gte('sales_date', momentToString(today.clone().startOf('month').subtract(6, 'month'), TIME_FORMAT))
      .lt('sales_date', momentToString(cloneToday, TIME_FORMAT));
    if (error) {
      return { sales: {}, error };
    }
    console.log(sales);
    return { sales, error };
  };

  useEffect(() => {
    getMonthSales().then(result => {
      if (result.sales !== 0) {
        const refineData = formatData(result.sales as Tables<'sales'>[], cloneToday.subtract(6, 'month'));
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
