import { supabase } from '@/shared/supabase';

export const fetchTableInQRCode = async (id: string) => {
  const { data: store, error } = await supabase.from('store').select('use_table, store_table(*)').eq('business_id', id);

  if (error) throw new Error(error.message);
  return store;
};
