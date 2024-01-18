import { Tables } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addStoreOrder = async (item: Omit<Tables<'order_store'>, 'id'>) => {
  const { data, error } = await supabase.from('order_store').insert([item]).select();
  if (error) console.error(error);

  return { data, error };
};

export const fetchStoreOrderByOrderIdWithStoreName = async (orderIdList: string[], storeId: string) => {
  const { data, error } = await supabase
    .from('order_store')
    .select('*, store(business_name)')
    .eq('store_id', storeId)
    .filter('order_id', 'in', `(${orderIdList.join(',')})`);
  return { data, error };
};
