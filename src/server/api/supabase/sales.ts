import { momentToString } from '@/shared/helper';
import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { Moment } from 'moment';

export const addSales = async (sales: Omit<Tables<'sales'>, 'id'>[]) => {
  const { error } = await supabase.from('sales').insert(sales).select();

  if (error) console.error(error);
};

/**
 * supabase에서 오늘날짜를 우리나라시간대를 기준으로 생각하여 가지고 오고싶으면 사용하는 로직입니다.
 * const today = moment().hour(0).subtract(9, 'hour').format('YYYY-MM-DD HH:00');
 * 
 * supabase에서 내일 날짜를 우리나라 시간대를 기준으로 생각하여 가지고 오고싶으면 사용하는 로직입니다.
  const tomorrow = moment().hour(0).subtract(9, 'hour').add(1, 'day').format('YYYY-MM-DD HH:00');
 */

const TIME_FORMAT = 'YYYY-MM-DD HH:00';

/** const today = moment().hour(0).subtract(9, 'hour');
 * .gte(...,  momentToString(today.clone().subtract(6,'day')))
 * .lt(..., momentToString(today.clone().add(1,'day')))
 * 를 하면 오늘 기준 7일치 꺼를 가져옵니다.
 * @param registric 현재 날짜에서 .hour(0).subtract(9,'hour')를 해줘야 합니다. supabase에서는 utc 기준이기때문입니다.
 * @param compare .hour(0).subtract(9,'hour)를 해줘야 합니다.
 * @returns
 */
export const getTodaySales: getSalesReturnType = async (registrict, compare) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(compare.subtract(6, 'day'), TIME_FORMAT))
    .lt('sales_date', momentToString(registrict.add(1, 'day'), TIME_FORMAT));
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
 * @param registrict
 * @param standard
 * @returns
 */

export const getWeekSales: getSalesReturnType = async (registrict, standard) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(standard.subtract(6, 'week'), TIME_FORMAT))
    .lte('sales_date', momentToString(registrict, TIME_FORMAT));

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
 * @param registrict
 * @param standard
 * @returns
 */

export const getMonthSales: getSalesReturnType = async (registrict, standard) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(standard.clone().startOf('month').subtract(6, 'month'), TIME_FORMAT))
    .lte('sales_date', momentToString(registrict, TIME_FORMAT));
  if (error) {
    return { sales: [], error };
  }
  return { sales, formatType: 'months' };
};

type DateFormatType = 'days' | 'weeks' | 'months';
export interface SalesDataReturnType {
  sales: Tables<'sales'>[];
  error?: PostgrestError;
  formatType?: DateFormatType;
}

type getSalesReturnType = (registric: Moment, compare: Moment) => Promise<SalesDataReturnType>;
