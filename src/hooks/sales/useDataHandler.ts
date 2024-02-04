import { formatData } from '@/components/sales/calendarUtility/formatData';
import { formattedDatabyExcel } from '@/components/sales/csv/utility/formatExcel';
import { getAllSales, getDaySales, getMonthsSales, getWeekSales } from '@/server/api/supabase/sales';
import { setCalendarCurrentDate } from '@/shared/store/sales/salesCalendar';
import { setChartData } from '@/shared/store/sales/salesChart';
import useDayState, { setSelectedDate } from '@/shared/store/sales/salesDay';
import { setRecordData } from '@/shared/store/sales/salesRecord';
import { setIsShow } from '@/shared/store/sales/salesToggle';
import useAuthState from '@/shared/store/session';
import { EnOrderType } from '@/types/sales';
import { Dayjs } from 'dayjs';

export const useDataHandler = () => {
  const storeId = useAuthState(state => state.storeId);
  const { utcStandardDate, today } = useDayState();

  const clickMoveTodayHandler = async () => {
    const { sales, dateType, formatType } = await getDaySales(utcStandardDate, storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, today, formatType!);
      if (result && recordData) {
        setChartData(result);
        setRecordData(recordData);
      }
    }
    if (sales.length === 0) {
      setChartData([]);
      setRecordData({
        currentSales: 0,
        dateType: 'day',
      });
    }

    setCalendarCurrentDate(today);
    setSelectedDate(today);
  };
  //sales/status에 있는 calendar에서 날짜를 클릭하면 그 날 기준 7일 데이터를 받아옵니다.
  /**
   *
   * @param day 날짜가 들어오면 그 날짜 기준으로 1주일치 매출을 가져옵니다.
   * @returns salesStore의 state값 변경으로 void 입니다.
   */
  const clickShowDataOfDateHandler = (day: Dayjs) => async () => {
    const { sales, dateType, formatType } = await getDaySales(day.hour(0).subtract(9, 'hour'), storeId!);
    if (sales.length !== 0) {
      const { result, recordData } = formatData(sales, dateType, day, formatType!);
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
    setSelectedDate(day);
    setCalendarCurrentDate(day);
  };

  const clickWeeksChartHandler = async () => {
    const { sales, dateType, formatType } = await getWeekSales(utcStandardDate, storeId!);
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
    setCalendarCurrentDate(today);
    setSelectedDate(today);
  };

  const clickMonthsChartHandler = async () => {
    const { sales, dateType, formatType } = await getMonthsSales(utcStandardDate, storeId!);
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
        dateType: 'month',
      });
    }
    setCalendarCurrentDate(today);
    setSelectedDate(today);
  };

  /**
   *
   * @param order_type 'togo' || 'store'
   */
  const clickGetAllDataHandler = async (order_type: EnOrderType) => {
    try {
      const { sales, orderType } = await getAllSales(today, storeId!, order_type);
      const formattedExcelData = formattedDatabyExcel(sales, orderType);
      return formattedExcelData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    clickMoveTodayHandler,
    clickShowDataOfDateHandler,
    clickWeeksChartHandler,
    clickMonthsChartHandler,
    clickGetAllDataHandler,
  };
};
