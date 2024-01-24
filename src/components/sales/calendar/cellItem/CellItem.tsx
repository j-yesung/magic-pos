import { convertNumberToWon } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales/sales';
import { cva } from 'class-variance-authority';
import moment, { Moment } from 'moment';

import useCalendarStore from '@/shared/store/sales/calendar';
import { CalendarDataType, GetMinMaxSalesReturnType } from '@/types/sales';
import { getCalendarType, getDateType, getDayType, getMonthType } from '../../calendarUtility/cellItemType';
import styles from './styles/cellItem.module.css';

interface CellItemProps {
  day: Moment;
  salesData?: CalendarDataType;
  getMinMaxSalesType?: (param: CalendarDataType) => GetMinMaxSalesReturnType;
  clickShowDataOfDateHandler?: (day: moment.Moment) => () => Promise<void>;
}

type Cell = (param: CellItemProps) => JSX.Element;

const CellItem: Cell = ({ day, salesData, getMinMaxSalesType, clickShowDataOfDateHandler }) => {
  const POINT = 'SELECTEDTYPE';
  const COMPONENT_TYPE = 'CALENDAR';

  const isChangeView = useSalesStore(state => state.isChangeView);
  const { currentDate, selectedDate, today } = useCalendarStore();

  const dateVariant = cva([styles.dateBase], {
    variants: {
      monthType: {
        PREV: styles.prevMonth,
        CURRENT: styles.currentMonth,
        AFTER: styles.afterMonth,
      },
      calendarType: {
        CURRENTCALENDAR: styles.current,
        PREVCALENDAR: styles.prev,
        AFTERCALENDAR: styles.after,
      },
      dateType: {
        PREV: styles.prevDate,
        CURRENT: styles.currentDate,
        AFTER: styles.afterDate,
      },
      selectedDateType: {
        SELECTEDTYPE: styles.pointDate,
      },
      componentType: {
        CALENDAR: styles.calendarCell,
      },
    },
  });

  const dayVariant = cva([styles.dayBase], {
    variants: {
      dayType: {
        SATURADAY: styles.saturaday,
        SUNDAY: styles.sunday,
        DAY: styles.day,
      },
    },
  });

  const salesVariant = cva([styles.salesBase], {
    variants: {
      sales: {
        MAX: styles.salesMax,
        MIN: styles.salesMin,
      },
    },
  });

  const formatDate = day.clone().format('YY MM D').substring(6);

  return (
    <div
      className={dateVariant({
        calendarType: getCalendarType(day, currentDate),
        monthType: getMonthType(day, currentDate),
        dateType: getDateType(day),
        selectedDateType: isChangeView && day.isSame(selectedDate, 'day') ? POINT : null,
        componentType: !isChangeView ? COMPONENT_TYPE : null,
      })}
      onClick={
        isChangeView
          ? day.isSame(today, 'D') || day.isBefore(today, 'D')
            ? clickShowDataOfDateHandler?.(day.clone())
            : undefined
          : undefined
      }
    >
      <span
        className={dayVariant({
          dayType: getDayType(day.clone()),
        })}
      >
        {day.isSame(today, 'D') ? 'today' : formatDate}
      </span>

      {/* sales/calendar에서 보여줄 날짜별 매출과 최저 최고 매출 CSS class입니다. */}

      <span
        className={salesVariant({
          sales: salesData && getMinMaxSalesType?.(salesData),
        })}
      >
        {!isChangeView && salesData?.sales && convertNumberToWon(salesData.sales)}
      </span>
    </div>
  );
};

export default CellItem;
