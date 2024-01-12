import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import { cva } from 'class-variance-authority';
import moment, { Moment } from 'moment';
import styles from '../styles/calendar.module.css';

const Cell = () => {
  const {
    date: { currentDate, selectedDate },
    setCurrentDate,
    setIsShow,
    setSelectedDate,
    setData,
  } = useManagementState();

  const startDay = currentDate.clone().startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentDate.clone().endOf('month').endOf('week'); // monthStart가 속한 마지막 주

  const clickShowDateHandler = (day: Moment) => async () => {
    const { sales, formatType } = await getTodaySales(day.clone().hour(0).subtract(9, 'hour'));
    if (sales.length !== 0) {
      const refineData = formatData(sales, formatType);
      setData(refineData!);
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

  const MONTH = {
    CURRENT: 'CURRENT' as string,
    PREV: 'PREV',
    AFTER: 'AFTER',
  };
  // default calendar 날의 css
  const CALENDARTYPE = {
    CURRENTCALENDAR: 'CURRENTCALENDAR',
    PREVCALENDAR: 'PREVCALENDAR',
  };

  const DATE = {
    CURRENT: 'CURRENT',
    PREV: 'PREV',
    AFTER: 'AFTER',
  };
  const DAY = {
    SATURADAY: 'SATURADAY',
    SUNDAY: 'SUNDAY',
    DAY: 'DAY', // 일반 날
  };

  function getMonthType(Month: Moment) {
    const today = moment();
    if (currentDate.isSame(today, 'M')) {
      return Month.isSame(today, 'M') ? MONTH['CURRENT'] : Month.isBefore(today, 'M') ? MONTH['PREV'] : MONTH['AFTER'];
    } else {
      return Month.isSame(currentDate, 'M') ? CALENDARTYPE['CURRENTCALENDAR'] : CALENDARTYPE['PREVCALENDAR'];
    }
  }

  function getDateType(day: Moment) {
    const today = moment();
    return day.isSame(today, 'D') ? DATE['CURRENT'] : day.isBefore(today, 'D') ? DATE['PREV'] : DATE['AFTER'];
  }

  function getDayType(day: Moment) {
    return day.day() === 6 ? DAY['SATURADAY'] : day.day() === 0 ? DAY['SUNDAY'] : DAY['DAY']!;
  }
  const POINT = 'SELECTEDTYPE';
  const today = moment(); // 유저의 현재 달입니다.
  const row = [];
  let days = [];
  let day = startDay;
  let formatDate = '';

  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      formatDate = day.clone().format('YY MM D');

      days.push(
        <div
          key={formatDate}
          className={dateVariant({
            monthType: getMonthType(day),
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
        </div>,
      );
      day = day.add(1, 'day').clone();
    }
    row.push(
      <div key={days[0].key} style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1rem' }}>
        {days}
      </div>,
    );
    days = [];
  }
  return (
    <div
      className="body"
      style={{
        display: 'grid',
        gap: '1rem',
        textAlign: 'center',
      }}
    >
      {row}
    </div>
  );
};

export default Cell;
