import { getMonthSales } from '@/server/api/supabase/sales';
import { groupByKey } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/calendar.module.css';
import CellItem from './CellItem';

type FormatCalendarReturnType = (data: Map<string, Tables<'sales'>[]>) => { sales: number; date: string }[];
type SortMinMaxDataReturnType = (target: { sales: number; date: string; min?: boolean; max?: boolean }[]) => {
  sales: number;
  date: string;
  min?: boolean;
  max?: boolean;
}[];
const Cell = () => {
  const {
    date: { currentDate },
  } = useSalesStore();
  const path = useRouter().pathname;
  const startDay = currentDate.clone().startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentDate.clone().endOf('month').endOf('week'); // monthStart가 속한 마지막 주

  const formatToCalendarData: FormatCalendarReturnType = data => {
    const refinedData = [...data.entries()].map(([key, value]) => {
      const data = {
        sales: value.reduce((acc, cur) => acc + cur.product_ea * cur.product_price, 0),
        date: key,
      };
      return data;
    });
    return refinedData;
  };

  const sortMinMaxData: SortMinMaxDataReturnType = target => {
    const sortedData = target.toSorted((min, max) => (min.sales < max.sales ? 1 : -1));
    if (sortedData.length > 1) {
      sortedData[0].max = true;
      sortedData[target.length - 1].min = true;
    }
    if (sortedData.length === 1) {
      sortedData[0].max = true;
    }
    return sortedData;
  };
  useEffect(() => {
    if (path === '/admin/sales/calendar')
      getMonthSales(currentDate.clone()).then(result => {
        if (result.sales.length !== 0) {
          const group = groupByKey<Tables<'sales'>>(
            result.sales.map(data => ({
              ...data,
              sales_date: moment(data.sales_date).format('YY MM DD'),
            })),
            'sales_date',
          );

          const formattedData = formatToCalendarData(group);
          const minMaxData = sortMinMaxData(formattedData);
        }
      });
  }, [currentDate]);

  const row = [];
  let days = [];
  let day = startDay;

  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      const itemKey = day.clone().format('YY MM DD');

      days.push(<CellItem key={itemKey} day={day} />);
      day = day.clone().add(1, 'day');
    }
    row.push(
      <div key={days[0].key} className={styles['calendar-row']}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className={styles['calendar-body']}>{row}</div>;
};

export default Cell;
