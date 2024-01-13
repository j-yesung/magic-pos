import { momentToString } from '@/shared/helper';
import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { Moment } from 'moment';

/**
 * DateFormatType은 helper에서 데이터를 가공할 때 사용합니다.
 */
export type DateFormatType = 'days' | 'weeks' | 'months';
export interface SalesDataReturnType {
  sales: Tables<'sales'>[];
  error?: PostgrestError;
  formatType?: DateFormatType;
}
type getSalesReturnType = (date: Moment) => Promise<SalesDataReturnType>;

export const addSales = async (sales: Omit<Tables<'sales'>, 'id'>[]) => {
  const { error } = await supabase.from('sales').insert(sales).select();

  if (error) console.error(error);
};

/**
 * supabase에서 우리나라시간대의 오늘날짜를 가지고 오고싶으면 사용하는 로직입니다.
 * const today = moment().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
 * 
 * supabase에서 우리나라 시간대의 내일 날짜를 를 가지고 오고싶으면 사용하는 로직입니다.
  const tomorrow = moment().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');
 */

const TIME_FORMAT = 'YYYY-MM-DD HH:00';

/** const today = moment().hour(0).subtract(9, 'hour');
 * .gte(...,  momentToString(today.clone().subtract(6,'day')))
 * .lt(..., momentToString(today.clone().add(1,'day')))
 * 를 하면 오늘 기준 7일치 꺼를 가져옵니다.
 *
 * @param day .hour(0).subtract(9,'hour)를 해준 moment()입니다.
 * @returns
 */

export const getTodaySales: getSalesReturnType = async day => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(day.clone().subtract(6, 'day'), TIME_FORMAT))
    .lt('sales_date', momentToString(day.clone().add(1, 'day'), TIME_FORMAT));
  if (error) {
    return { sales: [], error };
  }

  return { sales, formatType: 'days' };
};

/**
 * const today = moment().hour(0).subtract(9, 'hour')
 * .gte(...,  momentToString(today.clone().subtract(6, 'week'),TIME_FORMAT))
 * .lte('sales_date', momentToString(today.clone(), TIME_FORMAT));
 * 요번주를 기점으로 7주치 거를 가져옵니다.
 * @param week .hour(0).subtract(9,'hour)를 해준 moment()입니다.
 * @returns
 */

export const getWeekSales: getSalesReturnType = async week => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(week.clone().subtract(6, 'week'), TIME_FORMAT))
    .lte('sales_date', momentToString(week.clone(), TIME_FORMAT));

  if (error) {
    return { sales: [], error };
  }
  return { sales, formatType: 'weeks' };
};

/**
 * const today = moment().hour(0).subtract(9, 'hour');
 * .gte('sales_date', momentToString(today.clone().startOf('month').subtract(6, 'month'), TIME_FORMAT))
 * .lte('sales_date',momentToString(today.clone,TIME_FORMAT))
 * 을 하면 요번 달 기준으로 6달 치를 가져옵ㄴ디ㅏ.
 * @param day .hour(0).subtract(9,'hour)를 해준 moment()입니다.
 * @returns
 */

export const getMonthsSales: getSalesReturnType = async month => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte(
      'sales_date',
      momentToString(month.clone().subtract(6, 'month').startOf('month').subtract(6, 'month'), TIME_FORMAT),
    )
    .lte('sales_date', momentToString(month.clone(), TIME_FORMAT));
  if (error) {
    return { sales: [], error };
  }
  return { sales, formatType: 'months' };
};
