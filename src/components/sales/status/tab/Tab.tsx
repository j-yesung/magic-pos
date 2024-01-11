import { getMonthSales, getTodaySales, getWeekSales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import moment from 'moment';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // 초기 더러운 UI를 그나마 달력답게 바꿔주는 css
import Calendar from './calendar/Calendar';

const Tab = ({ setData }: { setData: React.Dispatch<React.SetStateAction<{ x: string; y: number }[]>> }) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(currentMonth.clone());
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
        <span
          onClick={async () => {
            const { sales, formatType } = await getTodaySales(
              today.clone().hour(0).subtract(9, 'hour'),
              today.clone().hour(0).subtract(9, 'hour'),
            );
            if (sales.length !== 0) {
              const refineData = formatData(sales, formatType);
              setData(pre => [...refineData!]);
            }
            clickMoveToday();
          }}
        >
          오늘
        </span>
        <span
          onClick={async () => {
            const { sales, formatType } = await getWeekSales(
              today.clone().hour(0).subtract(9, 'hour'),
              today.clone().hour(0).subtract(9, 'hour'),
            );
            if (sales.length !== 0) {
              const refineData = formatData(sales, formatType);
              setData(pre => [...refineData!]);
            }
          }}
        >
          이번 주
        </span>
        <span
          onClick={async () => {
            const { sales, formatType } = await getMonthSales(
              today.clone(),
              today.clone().startOf('month').subtract(6, 'month'),
            );
            if (sales.length !== 0) {
              const refineData = formatData(sales, formatType);
              setData(pre => [...refineData!]);
            }
          }}
        >
          이번 달
        </span>

        {isShow ? (
          <Calendar
            setData={setData}
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
