import { Tables } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addStoreOrder = async (item: Omit<Tables<'order_store'>, 'id'>) => {
  const { data, error } = await supabase.from('order_store').insert([item]).select();
  if (error) console.error(error);

  return { data, error };
};
