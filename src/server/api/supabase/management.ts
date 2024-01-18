import { supabase } from '@/shared/supabase';
import { OrderConfirmType } from '@/types/common';
import { StoreWithOrderInfo } from '@/types/supabase';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

export const fetchManagement = async (id?: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store')
      .select('*, store_table(*),order_store(*),order_number(*)')
      .eq('business_id', id)
      .eq('order_store.is_done', false)
      .eq('order_number.is_done', false)
    if (error) throw new Error(error.message);
    return store;
  }
};

export const updateIsDone = async (orderData: OrderConfirmType[]) => {
  for (let i = 0; i < orderData.length; i++) {
    const { error } = await supabase
      .from(`${orderData[i].isTogo ? 'order_number' : 'order_store'}`)
      .update({ is_done: true })
      .eq('id', orderData[i].id)
      .select()
    if (error) throw new Error(error.message);
  }
}

export const submitDetectedOrder = async (
  storeId: string,
  refetch: (options?: RefetchOptions | undefined) =>
    Promise<QueryObserverResult<StoreWithOrderInfo[] | undefined, Error>>
) => {
  supabase
    .channel('order_store')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'order_store', filter: `store_id=eq.${storeId}` },
      payload => {
        refetch();
      },
    )
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'order_number', filter: `store_id=eq.${storeId}` }, payload => {
      refetch();
    })
    .subscribe();
};