import { Tables } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addStoreOrder = async (item: Omit<Tables<'order_store'>, 'id'>) => {
  const { data, error } = await supabase.from('order_store').insert([item]).select();
  if (error) console.error(error);

  return { data, error };
};

export const fetchStoreOrderByOrderId = async (orderId: string) => {
  const { data, error } = await supabase
    .from('order_store, store(business_name)')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (error) console.error(error);

  return { data, error };
};
