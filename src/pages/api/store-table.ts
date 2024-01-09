import { supabase } from '@/shared/supabase';
import { TablesInsert } from '@/types/supabase';

export const fetchStoreTable = async (id: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store').select('*, store_table(*)').eq('business_id', id);
    if (error) throw new Error(error.message);
    console.log(store);
    return store;
  }
};

export const addStoreTable = async (storeTableData: TablesInsert<'store_table'>) => {
  const { data, error } = await supabase.from('store_table').insert([storeTableData]).select();
  // if (error) throw new Error(error.message);
  console.log(data);
  console.log(error);
};
