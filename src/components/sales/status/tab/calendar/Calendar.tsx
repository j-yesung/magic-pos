import moment from 'moment';
import 'moment/locale/ko';
import { useState } from 'react';
/**
 *
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const preMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };
  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };
  const 요일 = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  const monthStart = currentMonth.clone().startOf('month'); // 오늘이 속한 달의 시작일
  const monthEnd = currentMonth.clone().endOf('month'); // 오늘이 속한 달의 마지막 일
  const startDay = currentMonth.clone().startOf('month').startOf('week'); // monthStart가 속한 주의 시작 주
  const endDay = currentMonth.clone().endOf('month').endOf('week'); // monthStart가 속한 마지막 주

  const row = [];
  let days = [];
  let day = startDay;
  let formatDate = '';
  // console.log(monthStart);
  // console.log(monthEnd);
  // console.log(startDay);
  // console.log(endDay);

  while (day.clone().format('YY-MM-DD') <= endDay.clone().format('YY-MM-DD')) {
    for (let i = 0; i < 7; i++) {
      formatDate = day.clone().format('D');

      days.push(
        <div>
          <span>{formatDate}</span>
        </div>,
      );
      day = day.add(1, 'day').clone();
    }
    row.push(<div>{days}</div>);
    days = [];
  }

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="wrapper">
          <span className="text" style={{ display: 'flex', gap: '1rem' }}>
            <span className="text-year">{currentMonth.clone().format('YYYY')}</span>
            {currentMonth.clone().format('MMMM')}
          </span>
        </div>
        <div className="btn-group">
          <span className="left-btn" style={{ display: 'inline-block', marginRight: '10px' }} onClick={preMonth}>
            이전
          </span>
          <span className="right-btn" onClick={nextMonth}>
            다음
          </span>
        </div>
      </div>
      <div className="days" style={{ display: 'flex', gap: '1rem' }}>
        {요일.map(day => (
          <span key={day} className="day">
            {day}
          </span>
        ))}
      </div>
      <div className="body">{row}</div>
    </div>
  );
};

export default Calendar;
