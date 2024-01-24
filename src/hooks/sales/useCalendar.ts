import useCalendarStore, { setCalendarCurrentDate } from '@/shared/store/sales/calendar';
import { setIsShow } from '@/shared/store/sales/sales';

export const useCalendar = () => {
  const currentDate = useCalendarStore(state => state.currentDate);

  // 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
  const clickPreMonthHandler = () => {
    setCalendarCurrentDate(currentDate.clone().subtract(1, 'month'));
  };
  //다음 달로 이동
  const clickNextMonthHandler = () => {
    setCalendarCurrentDate(currentDate.clone().add(1, 'month'));
  };

  // sales/stauts에서 click하면 calendar를 보여주는 함수
  const clickShowCalendarHandler = () => setIsShow(true);
  const clickHiddenCalendarHandler = () => setIsShow(false);

  return {
    clickPreMonthHandler,
    clickNextMonthHandler,
    clickShowCalendarHandler,
    clickHiddenCalendarHandler,
  };
};
