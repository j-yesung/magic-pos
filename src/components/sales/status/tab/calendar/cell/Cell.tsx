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
  // const monthStart = currentMonth.clone().startOf('month'); // 오늘이 속한 달의 시작일
  // const monthEnd = currentMonth.clone().endOf('month'); // 오늘이 속한 달의 마지막 일
  const startDay = currentDate.clone().startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentDate.clone().endOf('month').endOf('week'); // monthStart가 속한 마지막 주

  const clickShowDate = (day: Moment) => async () => {
    const { sales, formatType } = await getTodaySales(
      day.clone().hour(0).subtract(9, 'hour'),
      day.clone().hour(0).subtract(9, 'hour'),
    );
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
        prev: styles['prev-month'],
        current: styles['current-month'],
        after: styles['after-month'],
        currentCalendar: styles['current'],
        prevCalendar: styles['prev'],
        afterCalendar: styles['after'],
      },
      dateType: {
        prev: styles['prev-date'],
        current: styles['current-date'],
        after: styles['after-date'],
      },
      pointDateType: {
        point: styles['point-date'],
      },
    },
  });

  const dayVariant = cva([styles['day-base']], {
    variants: {
      dayType: {
        saturaday: styles['saturaday'],
        sunday: styles['sunday'],
        day: styles['day'],
      },
    },
  });
  function getMonthType(Month: Moment) {
    const today = moment();
    if (currentDate.isSame(today, 'M')) {
      return Month.isSame(today, 'M') ? 'current' : Month.isBefore(today, 'M') ? 'prev' : 'after';
    } else {
      return Month.isSame(currentDate, 'M') ? 'currentCalendar' : 'prevCalendar';
    }
  }

  function getDateType(day: Moment) {
    const today = moment();
    return day.isSame(today, 'D') ? 'current' : day.isBefore(today, 'D') ? 'prev' : 'after';
  }

  function getDayType(day: Moment) {
    return day.day() === 6 ? 'saturaday' : day.day() === 0 ? 'sunday' : 'day';
  }

  const today = moment(); // 유저의 현재 달입니다.
  const row = [];
  let days = [];
  let day = startDay;
  let formatDate = '';

  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      formatDate = day.clone().format('D');

      days.push(
        <div
          key={formatDate}
          className={dateVariant({
            monthType: getMonthType(day),
            dateType: getDateType(day),
            pointDateType: day.isSame(selectedDate, 'day') ? 'point' : undefined,
          })}
          onClick={day.isSame(today, 'D') || day.isBefore(today, 'D') ? clickShowDate(day.clone()) : undefined}
        >
          <span
            className={dayVariant({
              dayType: getDayType(day.clone()),
            })}
          >
            {day.isSame(today, 'D') ? 'today' : formatDate}
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
