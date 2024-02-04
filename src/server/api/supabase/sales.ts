import { dayJsToString } from '@/components/sales/calendarUtility/dateCalculator';
import { supabase } from '@/shared/supabase';
import { EnOrderType, SalesAllReturnType, SalesDataReturnType } from '@/types/sales';
import { TablesInsert } from '@/types/supabase';
import { Dayjs } from 'dayjs';

type getSalesReturnType = (date: Dayjs, store_id: string) => Promise<SalesDataReturnType>;

type getAllSalesReurnType = (date: Dayjs, store_id: string, order_type: EnOrderType) => Promise<SalesAllReturnType>;

export const addSales = async (sales: TablesInsert<'sales'>[]) => {
  const { error } = await supabase.from('sales').insert(sales).select();

  if (error) console.error(error);
};

/**
 * supabase에서 우리나라시간대의 오늘날짜를 가지고 오고싶으면 사용하는 로직입니다.
 * const today = dayjs().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
 * 
 * supabase에서 우리나라 시간대의 내일 날짜를 를 가지고 오고싶으면 사용하는 로직입니다.
  const tomorrow = dayjs().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');
 */

// const TIME_FORMAT = 'YYYY-MM-DD 00:00';
// today.format(TIME_FORMAT) = 2024-01-25 00:00
const TIME_FORMAT = 'YYYY-MM-DD HH:00';

/** const today = dayjs().hour(0).subtract(9, 'hour');
 * .gte(...,  dayJSToString(today.subtract(6,'day')))
 * .lt(..., dayJsToString(today.add(1,'day')))
 * 를 하면 오늘 기준 7일치 꺼를 가져옵니다.
 *
 * @param day .hour(0).subtract(9,'hour)를 해준 dayjs()입니다.
 * @returns
 */

export const getDaySales: getSalesReturnType = async (day, store_id) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', dayJsToString(day.subtract(5, 'day'), TIME_FORMAT))
    .lt('sales_date', dayJsToString(day.add(1, 'day'), TIME_FORMAT))
    .eq('store_id', store_id);
  if (error) {
    return { sales: [], dateType: 'day', error };
  }

  return { sales, dateType: 'day', formatType: 'YYYY-MM-DD' };
};

/**
 * const today = dayjs().hour(0).subtract(9, 'hour')
 * .gte(...,  dayJsToString(today.subtract(6, 'week'),TIME_FORMAT))
 * .lte('sales_date', dayJsToString(today, TIME_FORMAT));
 * 요번주를 기점으로 7주치 거를 가져옵니다.
 * @param week .hour(0).subtract(9,'hour)를 해준 dayjs()입니다.
 * @returns
 */

export const getWeekSales: getSalesReturnType = async (week, store_id) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', dayJsToString(week.subtract(6, 'week'), TIME_FORMAT))
    .lt('sales_date', dayJsToString(week.add(1, 'day'), TIME_FORMAT))
    .eq('store_id', store_id);

  if (error) {
    return { sales: [], dateType: 'week', error };
  }
  return { sales, dateType: 'week', formatType: 'YYYY-MM' };
};

/**
 * const today = dayjs().hour(0).subtract(9, 'hour');
 * .gte('sales_date', dayJsToString(today.startOf('month').subtract(6, 'month'), TIME_FORMAT))
 * .lte('sales_date',dayJsToString(today,TIME_FORMAT))
 * 을 하면 요번 달 기준으로 6달 치를 가져옵ㄴ디ㅏ.
 * @param day .hour(0).subtract(9,'hour)를 해준 dayjs()입니다.
 * @returns
 */

export const getMonthsSales: getSalesReturnType = async (months, store_id) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', dayJsToString(months.startOf('month').subtract(6, 'month'), TIME_FORMAT))
    .lte('sales_date', dayJsToString(months.endOf('month'), TIME_FORMAT))
    .eq('store_id', store_id);
  if (error) {
    return { sales: [], dateType: 'month', error };
  }
  return { sales, dateType: 'month', formatType: 'YYYY년 MM월' };
};

/**
 * compoent/sales/calendar 폴더에서 사용될 비동기 함수(데이터)입니다.
 * @param month : .hour(0).subtract(9,'hour)를 해준 dayjs()입니다.
 * @returns 1달치의 data가 return 됩니다.
 */

export const getMonthSales: getSalesReturnType = async (month, store_id) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', dayJsToString(month.startOf('month'), TIME_FORMAT))
    .lte('sales_date', dayJsToString(month.endOf('month'), TIME_FORMAT))
    .eq('store_id', store_id);
  if (error) {
    return { sales: [], dateType: 'month', error };
  }

  return { sales, dateType: 'month', formatType: 'YYYY년 MM월' };
};

/**
 *
 * @param date 오늘 날짜 기준
 * @param store_id
 * @param order_type 'store' | 'togo' , 매장 | 포장
 * @returns
 */
export const getAllSales: getAllSalesReurnType = async (date, store_id, order_type) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .lt('sales_date', dayJsToString(date.add(1, 'day'), TIME_FORMAT))
    .eq('store_id', store_id)
    .eq('order_type', order_type);
  if (error) {
    return { sales: [], orderType: order_type === 'togo' ? '포장' : '매장', error };
  }

  return { sales, orderType: order_type === 'togo' ? '포장' : '매장' };
};
