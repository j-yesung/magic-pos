import { supabase } from '@/shared/supabase';
import { TablesInsert, TablesUpdate } from '@/types/supabase';

export const fetchStoreTable = async (id: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store')
      .select('*, store_table(*)')
      .eq('business_id', id);
    if (error) throw new Error(error.message);
    return store;
  }
};

export const addStoreTable = async (storeTableData: TablesInsert<'store_table'>) => {
  const { error } = await supabase.from('store_table').insert([storeTableData]).select();
  if (error) throw new Error(error.message);
};

type StoreTableOmit = Omit<TablesUpdate<'store_table'>, 'store_id | position'>;
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

export const deleteStoreTable = async (id: string | undefined) => { 
  if (id) {
    const { error } = await supabase
      .from('store_table')
      .delete()
      .eq('id', id)
    if (error) throw new Error(error.message);
  }
}