import { supabase } from '@/shared/supabase';

export const incrementOrderNumber = async (storeId: string) => {
  const { data, error } = await supabase.rpc('increment_order_number', { row_id: storeId }).single();
  return { orderNumber: data, error };
};
