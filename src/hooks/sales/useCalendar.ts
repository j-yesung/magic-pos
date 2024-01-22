import { getMonthsSales, getTodaySales, getWeekSales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import useAuthState from '@/shared/store/session';
import { Moment } from 'moment';

export const useCalendar = () => {
  const {
    date: { currentDate, today, utcStandardDate },
    setCurrentDate,
    setIsShow,
    setSelectedDate,
    setData,
    setRecord,
    data,
  } = useSalesStore();
  const storeId = useAuthState(state => state.storeId);

  // 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
  const clickPreMonthHandler = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };
  //다음 달로 이동
  const clickNextMonthHandler = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };

  //sales/status에 있는 calendar에서 날짜를 클릭하면 그 날 기준 7일 데이터를 받아옵니다.
  /**
   *
   * @param day 날짜가 들어오면 그 날짜 기준으로 1주일치 매출을 가져옵니다.
   * @returns salesStore의 state값 변경으로 void 입니다.
   */
  const clickShowDataOfDateHandler = (day: Moment) => async () => {
    const { sales, formatType } = await getTodaySales(day.clone().hour(0).subtract(9, 'hour'), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType, day.clone());
      if (result && recordData) {
        setRecord(recordData);
        setData(result);
      }
    } else if (data.length !== 0) {
      setData([]);
    }
    setIsShow(false);
    setCurrentDate(day.clone());
    setSelectedDate(day.clone());
  };

  // sales/stauts에서 click하면 calendar를 보여주는 함수
  const clickShowCalendarHandler = () => setIsShow(true);

  const clickMoveTodayHandler = async () => {
    const { sales, formatType } = await getTodaySales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType, today);
      if (result && recordData) {
        setData(result);
        setRecord(recordData);
      }
    }
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const clickWeeksChartHandler = async () => {
    const { sales, formatType } = await getWeekSales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType);
      if (result && recordData) {
        setData(result);
        setRecord(recordData);
      }
    }
  };

  const clickMonthsChartHandler = async () => {
    const { sales, formatType } = await getMonthsSales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, formatType);

      if (result && recordData) {
        setData(result);
        setRecord(recordData);
      }
    }
  };

  return {
    clickShowDataOfDateHandler,
    clickPreMonthHandler,
    clickNextMonthHandler,
    clickShowCalendarHandler,
    clickMoveTodayHandler,
    clickWeeksChartHandler,
    clickMonthsChartHandler,
  };
};
