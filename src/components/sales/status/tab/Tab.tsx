import moment from 'moment';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // 초기 더러운 UI를 그나마 달력답게 바꿔주는 css
import Calendar from './calendar/Calendar';

const Tab = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(currentMonth);
  const [isShow, setIsShow] = useState(false);
  const clickShowCalendar = () => setIsShow(true);

  const today = moment();
  const yesterDay = today.clone().subtract(1, 'day');

  const clickMoveYesterday = () => {
    if (yesterDay === currentMonth) return;
    setCurrentMonth(yesterDay);
    setSelectedDate(yesterDay);
  };

  const clickMoveToday = () => {
    if (today === currentMonth) return;
    setCurrentMonth(today);
    setSelectedDate(today);
  };
  return (
    <div>
      <div>
        <span onClick={clickMoveYesterday}>어제</span>
        <span onClick={clickMoveToday}>오늘</span>
        <span>이번 주</span>
        <span>이번 달</span>

        {isShow ? (
          <Calendar
            isShow={isShow}
            setCurrentMonth={setCurrentMonth}
            currentMonth={currentMonth}
            setIsShow={setIsShow}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <span onClick={clickShowCalendar}>{currentMonth.format('YYYY-MMMM-DD')}</span>
        )}
      </div>
    </div>
  );
};

export default Tab;