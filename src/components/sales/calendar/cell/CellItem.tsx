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
import { Moment } from 'moment';
import styles from '../styles/calendar.module.css';
import { CalendarDataType } from './Cell';

const CellItem = ({
  day,
  salesData,
  getMinMaxSalesType,
  clickShowDataOfDateHandler,
}: {
  day: Moment;
  salesData?: CalendarDataType;
  getMinMaxSalesType?: (param: CalendarDataType) => GetMinMaxSalesReturnType;
  clickShowDataOfDateHandler?: (param: Moment) => () => Promise<void>;
}) => {
  const {
    date: { currentDate, selectedDate, today },
  } = useSalesStore();

  const dateVariant = cva([styles['date-base']], {
    variants: {
      monthType: {
        PREV: styles['prev-month'],
        CURRENT: styles['current-month'],
        AFTER: styles['after-month'],
      },
      calendarType: {
        CURRENTCALENDAR: styles['current'],
        PREVCALENDAR: styles['prev'],
        AFTERCALENDAR: styles['after'],
      },
      dateType: {
        PREV: styles['prev-date'],
        CURRENT: styles['current-date'],
        AFTER: styles['after-date'],
      },
      selectedDateType: {
        SELECTEDTYPE: styles['point-date'],
      },
    },
  });

  const dayVariant = cva([styles['day-base']], {
    variants: {
      dayType: {
        SATURADAY: styles['saturaday'],
        SUNDAY: styles['sunday'],
        DAY: styles['day'],
      },
    },
  });

  const salesVariant = cva([styles['sales-base']], {
    variants: {
      sales: {
        MAX: styles['sales-max'],
        MIN: styles['sales-min'],
      },
    },
  });
  // path '/admin/sales/calendar' , '/admin/sales/status'

  const POINT = 'SELECTEDTYPE';
  const formatDate = day.clone().format('YY MM D').substring(6);

  // if (path === '/admin/sales/calendar') {
  //   return (
  //     <div
  //       className={dateVariant({
  //         calendarType: getCalendarType(day, currentDate),
  //         monthType: getMonthType(day, currentDate),
  //         dateType: getDateType(day),
  //         selectedDateType: day.isSame(selectedDate, 'day') ? POINT : undefined,
  //       })}

  //     >
  //       <span
  //         className={dayVariant({
  //           dayType: getDayType(day.clone()),
  //         })}
  //       >
  //         {day.isSame(today, 'D') ? 'today' : formatDate}
  //       </span>
  //       <span
  //         className={salesVariant({
  //           sales: salesData && getMinMaxSalesType?.(salesData),
  //         })}
  //       >
  //         {salesData?.sales && convertNumberToWon(salesData.sales)}
  //       </span>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div
  //       className={dateVariant({
  //         calendarType: getCalendarType(day, currentDate),
  //         monthType: getMonthType(day, currentDate),
  //         dateType: getDateType(day),
  //         selectedDateType: day.isSame(selectedDate, 'day') ? POINT : undefined,
  //       })}
  //       onClick={
  //         day.isSame(today, 'D') || day.isBefore(today, 'D') ? clickShowDataOfDateHandler?.(day.clone()) : undefined
  //       }
  //     >
  //       <span
  //         className={dayVariant({
  //           dayType: getDayType(day.clone()),
  //         })}
  //       >
  //         {day.isSame(today, 'D') ? 'today' : formatDate}
  //       </span>
  //     </div>
  //   );
  // }

  return (
    <div
      className={dateVariant({
        calendarType: getCalendarType(day, currentDate),
        monthType: getMonthType(day, currentDate),
        dateType: getDateType(day),
        selectedDateType: day.isSame(selectedDate, 'day') ? POINT : undefined,
      })}
      onClick={
        day.isSame(today, 'D') || day.isBefore(today, 'D') ? clickShowDataOfDateHandler?.(day.clone()) : undefined
      }
    >
      <span
        className={dayVariant({
          dayType: getDayType(day.clone()),
        })}
      >
        {day.isSame(today, 'D') ? 'today' : formatDate}
      </span>
      <span
        className={salesVariant({
          sales: salesData && getMinMaxSalesType?.(salesData),
        })}
      >
        {salesData?.sales && convertNumberToWon(salesData.sales)}
      </span>
    </div>
  );
};

export default CellItem;
