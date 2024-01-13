import { getTodaySales } from '@/server/api/supabase/sales';
import { formatData } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
import { Moment } from 'moment';

export const useCalendar = () => {
  const { setCurrentDate, setIsShow, setSelectedDate, setData, setRecord } = useManagementState();

  /**
   * 날짜 클릭하면 그 날짜를 기준으로 1주일 전꺼 까지 Data를 불러오는 함수입니다.
   */

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

  return { clickShowDataOfDateHandler };
};
