import { supabase } from '@/shared/supabase';

export const fetchOrderCheckList = async (pageParam: number, id?: string, listType?: string) => {
  if (id && listType) {
    const typeOfDefault = listType === 'default' && '{*}';
    const typeOfDay = listType === 'day' && '*';

    const { data: order_store, error: storeError } = await supabase
      .from('order_store')
      .select('*')
      .eq('store_id', id)
      .filter('order_time', 'cs', typeOfDefault)
      .order('order_time', { ascending: false })
      .range(pageParam * 5, pageParam * 5 + 4);

    const { data: order_number, error: numberError } = await supabase
      .from('order_number')
      .select('*')
      .eq('store_id', id)
      .filter('order_time', 'cs', typeOfDefault)
      .order('order_time', { ascending: false })
      .range(pageParam * 5, pageParam * 5 + 4);

    if (storeError) throw new Error(storeError.message);
    if (numberError) throw new Error(numberError.message);
    const resultData = [...order_store, ...order_number]
      .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
      .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

    return resultData;
  }
};
