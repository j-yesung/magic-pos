import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { Moment } from 'moment';

export const useCalendar = () => {
  const {
    date: { currentDate },
    setCurrentDate,
    setIsShow,
    setSelectedDate,
    setData,
    setRecord,
  } = useSalesStore();

  /**
   * 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
   */
  const clickPreMonthHandler = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };
  const clickNextMonthHandler = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };
  const clickShowDataOfDateHandler = (day: Moment) => async () => {
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

  return { clickShowDataOfDateHandler, clickPreMonthHandler, clickNextMonthHandler };
};