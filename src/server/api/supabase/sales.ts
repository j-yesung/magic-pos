import { momentToString } from '@/shared/helper';
import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { Moment } from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:00';

export const addSales = async (sales: Omit<Tables<'sales'>, 'id'>[]) => {
  const { error } = await supabase.from('sales').insert(sales).select();

  if (error) console.error(error);
};

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

export const getWeekSales: getSalesReturnType = async (registrict, standard) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(standard.subtract(6, 'week'), TIME_FORMAT))
    .lt('sales_date', momentToString(registrict, TIME_FORMAT));

  if (error) {
    return { sales: [], error };
  }
  return { sales, formatType: 'weeks' };
};

export const getMonthSales: getSalesReturnType = async (registrict, standard) => {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('*')
    .gte('sales_date', momentToString(standard.clone().startOf('month').subtract(6, 'month'), TIME_FORMAT))
    .lt('sales_date', momentToString(registrict, TIME_FORMAT));
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
