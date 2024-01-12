import { supabase } from '@/shared/supabase';

export const FetchManagement = async (id: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store')
      .select('*, store_table(*),order_store(*),order_number(*)')
      .eq('business_id', id)
      .eq('order_store.is_done', false)
      .eq('order_number.is_done', false);
    
    const storeData = store?.map(store => ({
      ...store,
      store_table: store.store_table.sort((a, b) => (a.position && b.position && a.position < b.position ? -1 : 1)),
      order_store: store.order_store.sort((a, b) => (a.order_number > b.order_number ? -1 : 1)),
      order_number: store.order_number.sort((a, b) => (a.order_number < b.order_number ? -1 : 1)),
    }));
    console.log(store)
    
    if (error) throw new Error(error.message);
    return storeData;
  }
};

