import moment from 'moment';
import 'moment/locale/ko';
import { useState } from 'react';

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

  return (
    <div className="header">
      <div className="wrapper">
        <span className="text" style={{ display: 'flex', gap: '1rem' }}>
          <span className="text-year">{currentMonth.clone().format('YYYY')}</span>
          {currentMonth.clone().format('MMMM')}
        </span>
      </div>
      <div className="btn-group">
        <span className="left-btn" onClick={preMonth}>
          이전
        </span>
        <span className="right-btn" onClick={nextMonth}>
          다음
        </span>
      </div>
    </div>
  );
};

export default Calendar;
