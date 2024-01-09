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

  const today = moment(); // 유저의 현재 달입니다.

  while (day <= endDay) {
    for (let i = 0; i < 7; i++) {
      formatDate = day.clone().format('D');
      // 유저의 현재 달을 기준으로 이전 달이면 회색 배경, 현재 달이면 저희 main color, 다음 달은 #d95959로 표현 했습니다.
      days.push(
        <div
          style={
            day.isSame(today, 'M')
              ? { backgroundColor: ' #5200FF', padding: '1rem' }
              : day.isBefore(today, 'M')
              ? { backgroundColor: '#ccc', padding: '1rem' }
              : { backgroundColor: '#d95959', padding: '1rem' }
          }
        >
          <span style={{ color: '#fff' }}>{formatDate}</span>
        </div>,
      );
      day = day.add(1, 'day').clone();
    }
    row.push(<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1rem' }}>{days}</div>);
    days = [];
  }

  return (
    <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
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

      <div className="days" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1rem' }}>
        {요일.map(day => (
          <span key={day} className="day">
            {day}
          </span>
        ))}
      </div>
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
    </div>
  );
};

export default Calendar;
