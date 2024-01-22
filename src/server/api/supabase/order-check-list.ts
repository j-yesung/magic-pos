import { supabase } from '@/shared/supabase';

export const fetchOrderCheckList = async (pageParam: number, id?: string) => {
  if (id) {
    const { data: order_store, error: storeError } = await supabase
      .from('order_store')
      .select('*')
      .eq('store_id', id)
      .range(pageParam * 5, pageParam * 5 + 4);

    const { data: order_number, error: numberError } = await supabase
      .from('order_number')
      .select('*')
      .eq('store_id', id)
      .range(pageParam * 5, pageParam * 5 + 4);

    if (storeError) throw new Error(storeError.message);
    if (numberError) throw new Error(numberError.message);

    return [...order_store, ...order_number].sort((a, b) =>
      (a && b && a.is_done && !b.is_done) || (a && b && a.order_time < b.order_time) ? 1 : -1,
    );
  }
};
