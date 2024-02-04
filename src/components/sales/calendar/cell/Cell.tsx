import { useDataHandler } from '@/hooks/sales/useDataHandler';
import { getMonthSales } from '@/server/api/supabase/sales';
import { groupByKey } from '@/shared/helper';
import useCalendarState from '@/shared/store/sales/salesCalendar';
import useSalesDataState, {
  resetCalendarBindingData,
  setCalendarBindingData,
  setSalesSum,
} from '@/shared/store/sales/salesData';
import useHolidayState from '@/shared/store/sales/salesHoliday';
import useAuthState from '@/shared/store/session';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FORMAT_CELL_DATE_TYPE, getMinMaxSalesType } from '../../calendarUtility/cellItemType';
import { formatToCalendarData, sortMinMaxData } from '../../calendarUtility/formatData';

import { BIG_MODE, CALENDAR_PAGE, STATUS_PAGE } from '../calendarType/calendarType';
import CellItem from '../cellItem/CellItem';
import styles from './styles/cell.module.css';

const Cell = ({ mode, page }: { mode: CalendarModeType; page: CalendarPageType }) => {
  const holidays = useHolidayState(state => state.holidays);

  const calendarBindingData = useSalesDataState(state => state.calendarBindingData);

  const currentDate = useCalendarState(state => state.currentDate);
  const { clickShowDataOfDateHandler } = useDataHandler();

  const startDay = currentDate.startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentDate.endOf('month').endOf('week'); // monthStart가 속한 마지막 주

  const storeId = useAuthState(state => state.storeId);

  useEffect(() => {
    if (mode === BIG_MODE) {
      getMonthSales(currentDate, storeId!).then(result => {
        if (result.sales.length !== 0) {
          const group = groupByKey<Tables<'sales'>>(
            result.sales.map(data => ({
              ...data,
              sales_date: dayjs(data.sales_date).format(FORMAT_CELL_DATE_TYPE),
            })),
            'sales_date',
          );

          const formattedData = formatToCalendarData(group);
          const minMaxData = sortMinMaxData(formattedData);

          setSalesSum(formattedData);
          setCalendarBindingData(minMaxData);
        } else {
          // 불필요한 렌더링임... 최적화 필요!!
          setSalesSum(null);
          resetCalendarBindingData();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);
  const holiday = holidays[currentDate.format('YYYY')];
  const row = [];
  let days = [];
  let day = startDay;
  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      const itemKey = day.format(FORMAT_CELL_DATE_TYPE);
      const salesData = calendarBindingData?.filter(target => target.date === itemKey);

      const holidayDate = holiday.filter(date => date.date === itemKey);
      days.push(
        <CellItem
          key={itemKey}
          mode={mode}
          day={day}
          salesData={salesData ? salesData[0] : undefined}
          // ... spreadOperator
          {...(page === CALENDAR_PAGE && { getMinMaxSalesType: getMinMaxSalesType })}
          {...(page === STATUS_PAGE && { clickShowDataOfDateHandler: clickShowDataOfDateHandler })}
          holiday={holidayDate}
        />,
      );
      day = day.add(1, 'day');
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
