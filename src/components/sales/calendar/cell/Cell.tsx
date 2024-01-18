import { useCalendar } from '@/hooks/sales/useCalendar';
import { getMonthSales } from '@/server/api/supabase/sales';
import { getMinMaxSalesType, groupByKey } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect } from 'react';
import styles from '../styles/calendar.module.css';
import CellItem from './CellItem';

type FormatCalendarReturnType = (data: Map<string, Tables<'sales'>[]>) => { sales: number; date: string }[];
export interface CalendarDataType {
  sales: number;
  date: string;
  min?: boolean;
  max?: boolean;
}

type SortMinMaxDataReturnType = (target: CalendarDataType[]) => CalendarDataType[];
const Cell = () => {
  const {
    date: { currentDate, today },
    setCalendarData,
    calendarData,
    setSalesSum,
    isChangeView,
    setCurrentDate,
  } = useSalesStore();
  const { clickShowDataOfDateHandler } = useCalendar();

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
    if (!isChangeView) {
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
          setCalendarData(minMaxData);
          setSalesSum(formattedData);
        }
      });
    }
    return () => {
      if (calendarData.length !== 0) {
        setCalendarData([]);
        setSalesSum(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  useEffect(() => {
    return () => {
      setCurrentDate(today);
    };
  }, []);

  const row = [];
  let days = [];
  let day = startDay;
  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      const itemKey = day.clone().format('YY MM DD');
      const salesData = calendarData?.filter(target => target.date === itemKey);

      days.push(
        <CellItem
          key={itemKey}
          day={day}
          salesData={salesData[0]}
          {...(!isChangeView && { getMinMaxSalesType: getMinMaxSalesType })}
          {...(isChangeView && { clickShowDataOfDateHandler: clickShowDataOfDateHandler })}
        />,
      );
      day = day.clone().add(1, 'day');
    }
    row.push(
      <div key={days[0].key} className={styles.calendarRow}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className={styles.calendarBody}>{row}</div>;
};

export default Cell;
