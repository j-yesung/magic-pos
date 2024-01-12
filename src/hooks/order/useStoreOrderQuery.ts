import { useMutation, useQuery } from '@tanstack/react-query';
import { addStoreOrder, fetchStoreOrderByOrderId } from '@/server/api/supabase/order-store';

const QUERY_KEY = 'store-order';

/**
 * supabase order_store table CRUD hook
 */
export const useStoreOrderQuery = (orderId?: string) => {
  const { data: storeOrderData } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => {
      return fetchStoreOrderByOrderId(orderId ?? '');
    },
  });

  const addStoreOrderQuery = useMutation({
    mutationFn: addStoreOrder,
    onError: error => {
      console.error(error);
    },
  });

  return { addStoreOrder: addStoreOrderQuery.mutate, storeOrderData };
};
