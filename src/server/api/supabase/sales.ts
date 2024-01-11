import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';

export const addSales = async (sales: Omit<Tables<'sales'>, 'id'>[]) => {
  const { error } = await supabase.from('sales').insert(sales).select();

  if (error) console.error(error);
};
