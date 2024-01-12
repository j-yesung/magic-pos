import { Tables } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addNumberOrder = async (item: Omit<Tables<'order_number'>, 'id'>) => {
  const { data, error } = await supabase.from('order_number').insert([item]).select();
  return { data, error };
};

export const fetchNumberOrderByOrderId = async (orderId: string) => {
  const { data, error } = await supabase.from('order_number').select('*').eq('order_id', orderId).single();
  return { data, error };
};
