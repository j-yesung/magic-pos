import { supabase } from '@/shared/supabase';
import moment from 'moment';

export const fetchOrderCheckList = async (pageParam: number, id?: string, listType?: string) => {
  if (id && listType) {
    console.log(moment().toString());
    if (listType === 'day') {
      const { data: order_store, error: storeError } = await supabase
        .from('order_store')
        .select('*')
        .eq('store_id', id)
        .gte('order_time', moment().format('YYYY-MM-DD'))
        .order('order_time', { ascending: false })
        .range(pageParam * 5, pageParam * 5 + 4);

      const { data: order_number, error: numberError } = await supabase
        .from('order_number')
        .select('*')
        .eq('store_id', id)
        .gte('order_time', moment().format('YYYY-MM-DD'))
        .order('order_time', { ascending: false })
        .range(pageParam * 5, pageParam * 5 + 4);

      if (storeError) throw new Error(storeError.message);
      if (numberError) throw new Error(numberError.message);
      const resultData = [...order_store, ...order_number]
        .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
        .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

      return resultData;
    } else {
      const { data: order_store, error: storeError } = await supabase
        .from('order_store')
        .select('*')
        .eq('store_id', id)
        .order('order_time', { ascending: false })
        .range(pageParam * 5, pageParam * 5 + 4);

      const { data: order_number, error: numberError } = await supabase
        .from('order_number')
        .select('*')
        .eq('store_id', id)
        .order('order_time', { ascending: false })
        .range(pageParam * 5, pageParam * 5 + 4);

      if (storeError) throw new Error(storeError.message);
      if (numberError) throw new Error(numberError.message);
      const resultData = [...order_store, ...order_number]
        .sort((a, b) => (a && b && a.order_time < b.order_time ? 1 : -1))
        .sort((a, b) => (a && b && a.is_done === b.is_done ? 0 : a.is_done ? 1 : -1));

      return resultData;
    }
  }
};
