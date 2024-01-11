import { Tables } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addNumberOrder = async (item: Omit<Tables<'order_number'>, 'id'>) => {
  const { data, error } = await supabase.from('order_number').insert([item]).select();
  if (error) console.error(error);

  return { data, error };
};
