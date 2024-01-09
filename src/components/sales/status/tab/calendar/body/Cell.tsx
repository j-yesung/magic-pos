import { cva } from 'class-variance-authority';
import moment, { Moment } from 'moment';
import styles from './cell.module.css';

const Cell = ({ currentMonth }: { currentMonth: Moment }) => {
  const monthStart = currentMonth.clone().startOf('month'); // 오늘이 속한 달의 시작일
  const monthEnd = currentMonth.clone().endOf('month'); // 오늘이 속한 달의 마지막 일
  const startDay = currentMonth.clone().startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentMonth.clone().endOf('month').endOf('week'); // monthStart가 속한 마지막 주
  const dateVariant = cva([styles['date-base']], {
    variants: {
      monthType: {
        prev: styles['prev-month'],
        current: styles['current-month'],
        after: styles['after-month'],
      },
      dateType: {
        prev: styles['prev-date'],
        current: styles['current-date'],
        after: styles['after-date'],
      },
    },
  });
  function getMonthType(Month: Moment) {
    const today = moment();
    return Month.isSame(today, 'M') ? 'current' : Month.isBefore(today, 'M') ? 'prev' : 'after';
  }

  function getDateType(day: Moment) {
    const today = moment();
    return day.isSame(today, 'D') ? 'current' : day.isBefore(today, 'D') ? 'prev' : 'after';
  }
  const row = [];
  let days = [];
  let day = startDay;
  let formatDate = '';

  const today = moment(); // 유저의 현재 달입니다.

  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      formatDate = day.clone().format('D');

      days.push(
        <div
          className={dateVariant({
            monthType: getMonthType(day),
            dateType: getDateType(day),
          })}
        >
          <span style={{ color: '#fff' }}>{day.isSame(today, 'D') ? 'today' : formatDate}</span>
        </div>,
      );
      day = day.add(1, 'day').clone();
    }
    row.push(<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1rem' }}>{days}</div>);
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
