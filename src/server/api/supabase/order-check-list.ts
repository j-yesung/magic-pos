import { supabase } from "@/shared/supabase";


export const fetchOrderCheckList = async (id?: string, pageParam) => {
  if (id) {
    const { data: order_store, error: storeError } = await supabase.from('order_store')
      .select('*')
      .eq('store_id', id)
      .limit(pageParam * 2)

    const { data: order_number, error: numberError } = await supabase.from('order_number')
      .select('*')
      .eq('store_id', id)
      .limit(pageParam * 2)

    if (storeError) throw new Error(storeError.message);
    if (numberError) throw new Error(numberError.message);

    return [...order_store, ...order_number];
  }
};