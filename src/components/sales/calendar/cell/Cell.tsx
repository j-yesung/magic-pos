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

import useFilterButton from '@/hooks/service/order-check-list/useFilterButton';
import { useModal } from '@/hooks/service/ui/useModal';
import { CalendarCellType } from '@/types/calendar';
import SalesModal from '../../modal/SalesModal';
import { BIG_MODE, CALENDAR_PAGE, STATUS_PAGE } from '../calendarType/calendarType';
import CellItem from '../cellItem/CellItem';
import styles from './styles/cell.module.css';

const Cell = ({ mode, page, clickShowDataOfDateHandler, clickShowSalesModal }: CalendarCellType) => {
  /**
   * 캘린더에 사용되는 state입니다 건들지 마십쇼
   */
  const currentDate = useCalendarState(state => state.currentDate);
  // monthStart가 속한 주의 시작 주
  const startDay = currentDate.startOf('month').startOf('week');
  // monthStart가 속한 마지막 주
  const endDay = currentDate.endOf('month').endOf('week');
  /**
   * Sales Page에서 사용하는 state
   */
  const storeId = useAuthState(state => state.storeId);
  const holidays = useHolidayState(state => state.holidays);
  const calendarBindingData = useSalesDataState(state => state.calendarBindingData);
  const { MagicModal } = useModal();

  const holiday = holidays[currentDate.format('YYYY')];
  /**
   * 다른 페이지에서 호출 되는 공간 입니다. 아래에서 hook으로 써주면 아리가또우
   */
  const { clickStartTimeHandler, clickEndTimeHandler } = useFilterButton();
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
          setSalesSum(null);
          resetCalendarBindingData();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const row = [];
  let days = [];
  let day = startDay;
  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      const itemKey = day.format(FORMAT_CELL_DATE_TYPE);
      const salesData = calendarBindingData?.filter(target => target.date === itemKey);
      const holidayDate = holiday?.filter(date => date.date === itemKey);

      days.push(
        <CellItem
          key={itemKey}
          id={itemKey}
          page={page}
          mode={mode}
          day={day}
          salesData={salesData ? salesData[0] : undefined}
          // ... spreadOperator
          // 아래 조건부 함수는 Sales page에서 사용하는 props 입니다.
          {...(page === CALENDAR_PAGE && { getMinMaxSalesType: getMinMaxSalesType })}
          holiday={holidayDate}
          /** 페이지가 주문내역 확인이면 아래와 같이 하면 됩니다.
           *{...((page===ORDER && {clickHandler: clickHandler}))}
           */
          {...(page === 'ORDER_START_PAGE' && { clickStartTimeHandler: clickStartTimeHandler })}
          {...(page === 'ORDER_END_PAGE' && { clickEndTimeHandler: clickEndTimeHandler })}
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
  return (
    <div
      className={styles.calendarBody}
      {...(page === STATUS_PAGE && { onClick: clickShowDataOfDateHandler })}
      {...(page === CALENDAR_PAGE && {
        onClick: e => {
          const data = clickShowSalesModal?.(e);
          if (!data) return;
          MagicModal.fire(<SalesModal specificData={data} />);
        },
      })}
    >
      {row}
    </div>
  );
};

export default Cell;
