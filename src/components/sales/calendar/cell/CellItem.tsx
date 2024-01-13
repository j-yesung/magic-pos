import { useCalendar } from '@/hooks/sales/useCalendar';
import {
  convertNumberToWon,
  getCalendarType,
  getDateType,
  getDayType,
  getMinMaxSalesType,
  getMonthType,
} from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { cva } from 'class-variance-authority';
import { Moment } from 'moment';
import { useRouter } from 'next/router';
import styles from '../styles/calendar.module.css';
import { CalendarDataType } from './Cell';

const CellItem = ({ day, salesData }: { day: Moment; salesData?: CalendarDataType }) => {
  const {
    date: { currentDate, selectedDate, today },
  } = useSalesStore();
  const { clickShowDataOfDateHandler } = useCalendar();
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
  const STATUS_KEY = '/admin/sales/status';

  const path = useRouter().pathname;
  return (
    <div
      className={dateVariant({
        calendarType: getCalendarType(day, currentDate),
        monthType: getMonthType(day, currentDate),
        dateType: getDateType(day),
        selectedDateType: day.isSame(selectedDate, 'day') ? POINT : undefined,
      })}
      onClick={
        path === STATUS_KEY
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
        {salesData?.sales && convertNumberToWon(salesData.sales)}
      </span>
    </div>
  );
};

export default CellItem;
