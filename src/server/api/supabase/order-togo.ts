import { Tables } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addNumberOrder = async (item: Omit<Tables<'order_number'>, 'id'>) => {
  const { data, error } = await supabase.from('order_number').insert([item]).select();
  return { data, error };
};

export const fetchNumberOrderByOrderIdWithStoreName = async (orderIdList: string[]) => {
  const { data, error } = await supabase
    .from('order_number')
    .select('*, store(business_name)')
    .filter('order_id', 'in', `(${orderIdList.join(',')})`);
  return { data, error };
};
