import useCalendarState, { setCalendarCurrentDate } from '@/shared/store/sales/salesCalendar';
import useDayState from '@/shared/store/sales/salesDay';
import { setIsShow } from '@/shared/store/sales/salesToggle';
import { useCallback } from 'react';

export const useCalendar = () => {
  const currentDate = useCalendarState(state => state.currentDate);
  const selectedDate = useDayState(state => state.selectedDate);

  // 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
  const clickPreMonthHandler = useCallback(() => {
    setCalendarCurrentDate(currentDate.subtract(1, 'month'));
  }, [currentDate]);
  //다음 달로 이동
  const clickNextMonthHandler = useCallback(() => {
    setCalendarCurrentDate(currentDate.add(1, 'month'));
  }, [currentDate]);

  // 달력 달을 바꾸고 선택을 안했을 때 닫았다가 다시 열면 현재 적혀있는 날짜와 다른 달을 보이기에 조건문 추가 함
  const clickHiddenCalendarHandler = useCallback(() => {
    if (!currentDate.isSame(selectedDate)) {
      setCalendarCurrentDate(selectedDate);
    }
    setIsShow(false);
  }, [currentDate, selectedDate]);

  return {
    clickPreMonthHandler,
    clickNextMonthHandler,
    clickHiddenCalendarHandler,
  };
};
