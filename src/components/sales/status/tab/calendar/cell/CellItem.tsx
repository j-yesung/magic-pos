import { useCalendar } from '@/hooks/sales/useCalendar';
import { getCalendarType, getDateType, getDayType, getMonthType } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import { cva } from 'class-variance-authority';
import { Moment } from 'moment';
import styles from '../styles/calendar.module.css';
const CellItem = ({ day }: { day: Moment }) => {
  const {
    date: { currentDate, selectedDate, today },
  } = useManagementState();

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

  const POINT = 'SELECTEDTYPE';
  const formatDate = day.clone().format('YY MM D');
  return (
    <div
      className={dateVariant({
        calendarType: getCalendarType(day, currentDate),
        monthType: getMonthType(day, currentDate),
        dateType: getDateType(day),
        selectedDateType: day.isSame(selectedDate, 'day') ? POINT : undefined,
      })}
      onClick={day.isSame(today, 'D') || day.isBefore(today, 'D') ? clickShowDataOfDateHandler(day.clone()) : undefined}
    >
      <span
        className={dayVariant({
          dayType: getDayType(day.clone()),
        })}
      >
        {day.isSame(today, 'D') ? 'today' : formatDate.substring(6)}
      </span>
    </div>
  );
};

export default CellItem;
