import { supabase } from '@/shared/supabase';
import { TablesInsert } from '@/types/supabase';
import { StoreTableOmit } from '@/types/table';

export const fetchStoreTable = async (id: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store')
      .select('*, store_table(*)')
      .eq('business_id', id)
    if (error) throw new Error(error.message);
    return store;
  }
};

export const addStoreTable = async (storeTableData: TablesInsert<'store_table'>) => {
  const { error } = await supabase.from('store_table').insert([storeTableData]).select()
  if (error) throw new Error(error.message);
};


export const updateStoreTable = async (storeTableData: StoreTableOmit) => {
  const { id, is_disabled, max_guest } = storeTableData;
  if (id) {
    const { error } = await supabase
      .from('store_table')
      .update({ max_guest, is_disabled })
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
  }
};
