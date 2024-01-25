import useCalendarStore, { setCalendarCurrentDate } from '@/shared/store/sales/calendar';
import useDayState from '@/shared/store/sales/day';
import { setIsShow } from '@/shared/store/sales/sales';

export const useCalendar = () => {
  const currentDate = useCalendarStore(state => state.currentDate);
  const selectedDate = useDayState(state => state.selectedDate);

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

  // 달력 달을 바꾸고 선택을 안했을 때 닫았다가 다시 열면 현재 적혀있는 날짜와 다른 달을 보이기에 조건문 추가 함
  const clickHiddenCalendarHandler = () => {
    if (!currentDate.isSame(selectedDate)) {
      setCalendarCurrentDate(selectedDate);
    }
    setIsShow(false);
  };

  return {
    clickPreMonthHandler,
    clickNextMonthHandler,
    clickShowCalendarHandler,
    clickHiddenCalendarHandler,
  };
};
