import { supabase } from '@/shared/supabase';

export const FetchManagement = async (id: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store').select('*, store_table(*)').eq('business_id', id);
    if (error) throw new Error(error.message);
    return store;
  }
};