import { formatData } from '@/components/sales/calendarUtility/formatData';
import { getDaySales, getMonthsSales, getWeekSales } from '@/server/api/supabase/sales';
import useCalendarStore, { setCalendarCurrentDate, setCalendarSelectedDate } from '@/shared/store/sales/calendar';
import { setChartData } from '@/shared/store/sales/chart';
import { setRecordData } from '@/shared/store/sales/record';
import { setIsShow } from '@/shared/store/sales/sales';
import useAuthState from '@/shared/store/session';
import { Moment } from 'moment';

export const useDataHandler = () => {
  const storeId = useAuthState(state => state.storeId);
  const { utcStandardDate, today } = useCalendarStore();
  const clickMoveTodayHandler = async () => {
    const { sales, dateType, formatType } = await getDaySales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, today, formatType!);
      if (result && recordData) {
        setChartData(result);
        setRecordData(recordData);
      }
    }
    if (sales.length === 0) {
      setRecordData({
        currentSales: 0,
        dateType: 'day',
      });
    }

    setCalendarCurrentDate(today);
    setCalendarSelectedDate(today);
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
        setRecordData(recordData);
        setChartData(result);
      }
    } else {
      setChartData([]);
      setRecordData({
        currentSales: 0,
        dateType: 'day',
      });
    }
    setIsShow(false);
    setCalendarCurrentDate(day.clone());
    setCalendarSelectedDate(day.clone());
  };

  const clickWeeksChartHandler = async () => {
    const { sales, dateType, formatType } = await getWeekSales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, today, formatType!);
      if (result && recordData) {
        setChartData(result);
        setRecordData(recordData);
      }
    }

    if (sales.length === 0) {
      setRecordData({
        currentSales: 0,
        dateType: 'week',
      });
    }
  };

  const clickMonthsChartHandler = async () => {
    const { sales, dateType, formatType } = await getMonthsSales(utcStandardDate.clone(), storeId!);
    if (sales.length !== 0) {
      console.log(dateType);
      const { result, recordData } = formatData(sales, dateType, today, formatType!);
      console.log(recordData);

      if (result && recordData) {
        setChartData(result);
        setRecordData(recordData);
      }
    }
    if (sales.length === 0) {
      setRecordData({
        currentSales: 0,
        dateType: 'month',
      });
    }
  };

  return { clickMoveTodayHandler, clickShowDataOfDateHandler, clickWeeksChartHandler, clickMonthsChartHandler };
};
