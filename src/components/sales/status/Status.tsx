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
  console.log('momentString', date.format(format));
  return date.format(format);
};

const getStartWeeks = (year: number) => {
  return new Array(12).fill(false).map((_, index) => moment().year(year).month(index).startOf('months').week());
};

const Status = () => {
  const [data, setData] = useState<{ x: string; y: number }[]>([]);

  // const today = moment().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
  // const tomorrow = moment().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');

  const today = moment().hour(0).subtract(9, 'hour');
  const cloneToday = today.clone();

  const formatData = (salesData: Tables<'sales'>[], formatType?: DateFormatType) => {
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
          .toSorted((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

        if (result[result.length - 2]) {
          result[result.length - 2].x = '어제';
        }
        result[result.length - 1].x = '오늘';

        return result;
      } else if (formatType === 'weeks') {
        // 주별로 데이터를 추출

        const newData = salesData.map(sales => {
          const momentDate = moment(sales.sales_date).hour(0).minute(0).second(0).add(9, 'hours'); // sales_date는 utc기준시간이므로  우리나라 시간으로 바꾸려면 // 9를 더해준다.
          const weeksInfoByYear = getStartWeeks(momentDate.year()); // 전년도 이번년도에서 시작하는 주차가 다르니까
          const weeksNumber = +momentDate.format('W'); // w는 일요일기준, W는 월요일기준으로 주차를 결정한다.
          const month = momentDate.month(); // 몇월인지
          const startWeeksNumber = weeksInfoByYear[month]; // 각 년도별 월별 주차시작이 들어있는 배열입니다.
          console.log(weeksNumber);
          // console.log('-0--', startWeeksNumber);
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

        return result;
      } else if (formatType === 'months') {
        // 월별로 데이터를 추출

        const group = groupByKey<Tables<'sales'>>(
          salesData.map(data => ({ ...data, sales_date: moment(data.sales_date).format('YYYY-MM') })),
          'sales_date',
        );

        console.log('group >> ', group);

        const result = [...group.entries()]
          .map(([key, value]) => {
            return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price!, 0) };
          })
          .sort((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

        return result;
      }
      return [];
    }
  };

  const getTodaySales = async (): Promise<SalesDataReturnType> => {
    const { data: sales, error } = await supabase
      .from('sales')
      .select('*')
      .gte('sales_date', momentToString(today.clone().subtract(6, 'day'), TIME_FORMAT))
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
    return { sales, formatType: 'yesterday' };
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
    return { sales, formatType: 'months' };
  };

  useEffect(() => {
    getMonthSales().then(result => {
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
