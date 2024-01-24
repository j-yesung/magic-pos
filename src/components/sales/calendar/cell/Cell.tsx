import { useDataHandler } from '@/hooks/sales/useDataHandler';
import { getMonthSales } from '@/server/api/supabase/sales';
import { groupByKey } from '@/shared/helper';
import useCalendarStore from '@/shared/store/sales/calendar';
import useDataStore, {
  resetCalendarBindingData,
  resetSalesSum,
  setCalendarBindingData,
  setSalesSum,
} from '@/shared/store/sales/data';
import useSalesStore from '@/shared/store/sales/sales';
import useAuthState from '@/shared/store/session';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import { useEffect } from 'react';
import { getMinMaxSalesType } from '../../calendarUtility/cellItemType';
import { formatToCalendarData, sortMinMaxData } from '../../calendarUtility/formatData';
import CellItem from '../cellItem/CellItem';
import styles from './styles/cell.module.css';

const Cell = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  const calendarDataBindingData = useDataStore(state => state.calendarBindingData);
  const currentDate = useCalendarStore(state => state.currentDate);
  const { clickShowDataOfDateHandler } = useDataHandler();

  const startDay = currentDate.clone().startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentDate.clone().endOf('month').endOf('week'); // monthStart가 속한 마지막 주

  const storeId = useAuthState(state => state.storeId);
  useEffect(() => {
    if (!isChangeView) {
      getMonthSales(currentDate.clone(), storeId!).then(result => {
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
          setCalendarBindingData(minMaxData);
          setSalesSum(formattedData);
        }
      });
    }

    return () => {
      resetCalendarBindingData();
      resetSalesSum();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const row = [];
  let days = [];
  let day = startDay;
  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      const itemKey = day.clone().format('YY MM DD');
      const salesData = calendarDataBindingData?.filter(target => target.date === itemKey);

      days.push(
        <CellItem
          key={itemKey}
          day={day}
          salesData={salesData[0]}
          // ... spreadOperator
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
