import moment from 'moment';
import 'moment/locale/ko';
import { useState } from 'react';
/**
 *
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  console.log(currentMonth.clone().format('MMMM'));
  console.log(currentMonth.clone().format('YYYY'));

  const preMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
  };
  const nextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
  };
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
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
        {days.map(day => (
          <span key={day} className="day">
            {day}
          </span>
        ))}
      </div>
      <div className="body"></div>
    </div>
  );
};

export default Calendar;
