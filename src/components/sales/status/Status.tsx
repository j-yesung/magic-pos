import { groupByKey } from '@/shared/helper';
import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
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

type DateFormatType = 'days' | 'weeks' | 'months';
interface SalesDataReturnType {
  sales: Tables<'sales'>[];
  error?: PostgrestError;
  formatType?: DateFormatType;
}

const TIME_FORMAT = 'YYYY-MM-DD HH:00';

const momentToString = (date: moment.Moment, format: string) => {
  return date.format(format);
};

const getStartWeeks = (year: number) => {
  return new Array(12).fill(false).map((_, index) => moment().year(year).month(index).startOf('months').week());
};

const Status = () => {
  const [data, setData] = useState<SalesType[]>([]);

  // const today = moment().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
  // const tomorrow = moment().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');

  const today = moment().hour(0).subtract(9, 'hour');
  const cloneToday = today.clone();

  const saleFormatData: SalesType[] = [];
  console.log(data);
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
      // const date = moment(data.sales_date).format('MMMM DDDD');

      return { day, date };
    }
    if ('요번달' === current) {
      const day = moment(data.sales_date).format('');
      const date = moment(data.sales_date);
    }
    return null;
  };

  const formatData = (salesData: Tables<'sales'>[], currentDay: Moment, formatType?: DateFormatType) => {
    if (salesData && formatType) {
      if (formatType === 'days') {
        // 일별로 데이터를 추출

        const group = groupByKey<Tables<'sales'>>(
          salesData.map(data => ({ ...data, sales_date: moment(data.sales_date).format('YYYY-MM-DD') })),
          'sales_date',
        );

        const result = [...group.entries()]
          .map(([key, value]) => {
            return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price!, 0) };
          })
          .sort((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

        console.log('result >>> ', result);
      } else if (formatType === 'weeks') {
        // 주별로 데이터를 추출

        const newData = salesData.map(sales => {
          const momentDate = moment(sales.sales_date).hour(0).minute(0).second(0).add(9, 'hours');
          const weeksInfoByYear = getStartWeeks(momentDate.year());
          const weeksNumber = +momentDate.format('W'); // w는 일요일기준, W는 월요일기준
          const month = momentDate.month();
          const startWeeksNumber = weeksInfoByYear[month];

          console.log(
            momentDate.format('YYYY-MM-DD HH:mm'),
            weeksNumber,
            startWeeksNumber,
            momentDate.format(`YYYY년 MM월 ${weeksNumber - startWeeksNumber + 1} 주차`),
          );

          return {
            ...sales,
            original_sales_date: momentDate,
            sales_date: momentDate.format(`YYYY년 MM월 ${weeksNumber - startWeeksNumber + 1} 주차`),
          };
        });

        const group = groupByKey<Tables<'sales'> & { original_sales_date: Moment }>(newData, 'sales_date');

        const result = [...group.entries()]
          .map(([key, value]) => {
            return {
              moment: value[0].original_sales_date,
              x: key,
              y: value.reduce((acc, cur) => acc + cur.product_price!, 0),
            };
          })
          .sort((a, b) => (moment(a.moment).isAfter(moment(b.moment)) ? 1 : -1));

        console.log('result >>> ', result);
      } else if (formatType === 'months') {
        // 월별로 데이터를 추출

        const group = groupByKey<Tables<'sales'>>(
          salesData.map(data => ({ ...data, sales_date: moment(data.sales_date).format('YYYY-MM') })),
          'sales_date',
        );

        console.log('group >> ', group);

        const result = [...group.entries()].map(([key, value]) => {
          return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price!, 0) };
        });

        console.log('result >>> ', result);
      }

      // const weekSales = data.reduce((acc, sales) => {
      //   const day = moment(sales.sales_date).format('MMMM');
      //   const date = moment(sales.sales_date).format('YYYY-MMMM');
      //   // const arr = data.map(d => {
      //   //   return { ...d, sales_date: moment(d.sales_date).format('YYYY-MMMM') };
      //   // });

      //   // const group = groupByKey(arr, 'sales_date');
      //   // console.log(
      //   //   group.forEach(value => {
      //   //     console.log(value);
      //   //   }),
      //   // );

      //   // console.log(moment(sales.sales_date).month()); //0 : 1월 ~ 11: 12월로 표기
      //   // // console;
      //   // // console.log(moment(sales.sales_date).week());
      //   const check = acc.findIndex(a => a.x === moment(sales.sales_date).format('dddd'));

      //   if (check !== -1) {
      //     acc[check].y += sales.product_price! * sales.product_ea!;
      //     acc[check].ea += sales.product_ea!;
      //     acc[check].category.push(sales.product_category!);
      //   } else {
      //     const refineSales = {
      //       y: sales.product_price! * sales.product_ea! || 0, // chart의 y축에 보여지는 label
      //       x: day, // chart의 x축에 보여지는 label입니다.
      //       ea: sales.product_ea || 0,
      //       category: [sales.product_category] || [],
      //       date,
      //     };
      //     acc.push(refineSales as SalesType);
      //   }

      //   return acc;
      // }, saleFormatData);

      // const sortWeekSales = weekSales.sort((pre, next) => {
      //   if (moment().day(pre.x) < moment().day(next.x)) return 1;
      //   if (moment().day(pre.x) > moment().day(next.x)) return -1;
      //   return 0;
      // });

      return [];
    }
  };

  const getTodaySales = async (): Promise<SalesDataReturnType> => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(cloneToday.subtract(6, 'day'), TIME_FORMAT))
      .lt('sales_date', momentToString(today.clone().add(1, 'day'), TIME_FORMAT));
    if (error) {
      return { sales: [], error };
    }

    return { sales, formatType: 'days' };
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

  const getWeekSales = async (): Promise<SalesDataReturnType> => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(cloneToday.subtract(6, 'week'), TIME_FORMAT))
      .lt('sales_date', momentToString(today, TIME_FORMAT));

    if (error) {
      return { sales: [], error };
    }
    return { sales, formatType: 'weeks' };
  };

  const getMonthSales = async (): Promise<SalesDataReturnType> => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(today.clone().startOf('month').subtract(6, 'month'), TIME_FORMAT))
      .lt('sales_date', momentToString(cloneToday, TIME_FORMAT));
    if (error) {
      return { sales: [], error };
    }
    console.log(sales);
    return { sales, formatType: 'months' };
  };

  useEffect(() => {
    getWeekSales().then(result => {
      if (result.sales.length !== 0) {
        const refineData = formatData(result.sales as Tables<'sales'>[], today, result.formatType);
        // setData(refineData!);
      }
    });
    // getMonthSales().then(result => {
    //   if (result.sales.length !== 0) {
    //     const refineData = formatData(result.sales as Tables<'sales'>[], today, result.formatType);
    //     // setData(refineData!);
    //   }
    // });
  }, []);

  return (
    <div>
      <Tab />
      <ChartBar />
    </div>
  );
};

export default Status;
