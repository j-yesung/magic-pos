import {
  GetMinMaxSalesReturnType,
  convertNumberToWon,
  getCalendarType,
  getDateType,
  getDayType,
  getMonthType,
} from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { cva } from 'class-variance-authority';
import moment, { Moment } from 'moment';
import styles from '../styles/calendar.module.css';
import { CalendarDataType } from './Cell';

interface CellItemProps {
  day: Moment;
  salesData?: CalendarDataType;
  getMinMaxSalesType?: (param: CalendarDataType) => GetMinMaxSalesReturnType;
  clickShowDataOfDateHandler?: (day: moment.Moment) => () => Promise<void>;
}

type Cell = (param: CellItemProps) => JSX.Element;

const CellItem: Cell = ({ day, salesData, getMinMaxSalesType, clickShowDataOfDateHandler }) => {
  const {
    date: { currentDate, selectedDate, today },
    isChangeView,
  } = useSalesStore();

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

  const POINT = 'SELECTEDTYPE';
  const formatDate = day.clone().format('YY MM D').substring(6);

  return (
    <div
      className={dateVariant({
        calendarType: getCalendarType(day, currentDate),
        monthType: getMonthType(day, currentDate),
        dateType: getDateType(day),
        selectedDateType: day.isSame(selectedDate, 'day') ? POINT : undefined,
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
