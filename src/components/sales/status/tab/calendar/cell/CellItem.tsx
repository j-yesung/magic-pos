import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData, getCalendarType, getDateType, getDayType, getMonthType } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import { cva } from 'class-variance-authority';
import moment, { Moment } from 'moment';
import styles from '../styles/calendar.module.css';
const CellItem = ({ day }: { day: Moment }) => {
  const {
    date: { currentDate, selectedDate, today },
    setCurrentDate,
    setIsShow,
    setSelectedDate,
    setData,
    setRecord,
  } = useManagementState();
  const clickShowDateHandler = (day: Moment) => async () => {
    const { sales, formatType } = await getTodaySales(day.clone().hour(0).subtract(9, 'hour'));
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType, day.clone());
      if (result && recordData) {
        console.log(recordData);
        setRecord(recordData);
        setData(result);
      }
    } else {
      setData([]);
    }
    setIsShow(false);
    setCurrentDate(day.clone());
    setSelectedDate(day.clone());
  };
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
  const test = moment();
  console.log(test.day());
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
      onClick={day.isSame(today, 'D') || day.isBefore(today, 'D') ? clickShowDateHandler(day.clone()) : undefined}
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
