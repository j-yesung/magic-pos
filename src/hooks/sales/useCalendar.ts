import { formatData } from '@/components/sales/calendarUtility/formatData';
import { getDaySales, getMonthsSales, getWeekSales } from '@/server/api/supabase/sales';
import useCalendarStore, { setCalendarCurrentDate, setCalendarSelectedDate } from '@/shared/store/sales/calendar';
import { setChartData } from '@/shared/store/sales/chart';

import useSalesStore from '@/shared/store/sales/sales';
import useAuthState from '@/shared/store/session';
import { Moment } from 'moment';

export const useCalendar = () => {
  const { setIsShow, setRecord } = useSalesStore();
  const { currentDate, today, utcStandardDate } = useCalendarStore();
  const storeId = useAuthState(state => state.storeId);

  // 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
  const clickPreMonthHandler = () => {
    setCalendarCurrentDate(currentDate.clone().subtract(1, 'month'));
  };
  //다음 달로 이동
  const clickNextMonthHandler = () => {
    setCalendarCurrentDate(currentDate.clone().add(1, 'month'));
  };

  //sales/status에 있는 calendar에서 날짜를 클릭하면 그 날 기준 7일 데이터를 받아옵니다.
  /**
   *
   * @param day 날짜가 들어오면 그 날짜 기준으로 1주일치 매출을 가져옵니다.
   * @returns salesStore의 state값 변경으로 void 입니다.
   */
  const clickShowDataOfDateHandler = (day: Moment) => async () => {
    const { sales, dateType, formatType } = await getDaySales(day.clone().hour(0).subtract(9, 'hour'), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, day.clone(), formatType!);
      if (result && recordData) {
        setRecord(recordData);
        setChartData(result);
      }
    } else {
      setChartData([]);
      setRecord({
        currentSales: 0,
        dateType: 'day',
      });
    }
    setIsShow(false);
    setCalendarCurrentDate(day.clone());
    setCalendarSelectedDate(day.clone());
  };

  // sales/stauts에서 click하면 calendar를 보여주는 함수
  const clickShowCalendarHandler = () => setIsShow(true);
  const clickHiddenCalendarHandler = () => setIsShow(false);

  const clickMoveTodayHandler = async () => {
    const { sales, dateType, formatType } = await getDaySales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, today, formatType!);
      if (result && recordData) {
        setChartData(result);
        setRecord(recordData);
      }
    } else {
      setRecord({
        currentSales: 0,
        dateType: 'day',
      });
    }
    setCalendarCurrentDate(today);
    setCalendarSelectedDate(today);
  };

  const clickWeeksChartHandler = async () => {
    const { sales, dateType, formatType } = await getWeekSales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, today, formatType!);
      if (result && recordData) {
        setChartData(result);
        setRecord(recordData);
      }
    }

    if (sales.length === 0) {
      setRecord({
        currentSales: 0,
        dateType: 'week',
      });
    }
  };

  const clickMonthsChartHandler = async () => {
    const { sales, dateType, formatType } = await getMonthsSales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, today, formatType!);

      if (result && recordData) {
        setChartData(result);
        setRecord(recordData);
      }
    } else {
      setRecord({
        currentSales: 0,
        dateType: 'month',
      });
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
    clickHiddenCalendarHandler,
  };
};
