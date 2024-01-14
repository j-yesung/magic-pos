import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStoreOrder, fetchStoreOrderByOrderIdWithStoreName } from '@/server/api/supabase/order-store';

const QUERY_KEY = 'store-order';

/**
 * supabase order_store table CRUD hook
 */
export const useStoreOrderQuery = (orderId?: string) => {
  const queryClient = useQueryClient();

  const { data: storeOrderData } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => {
      return fetchStoreOrderByOrderIdWithStoreName(orderId ?? '');
    },
  });

  const addStoreOrderQuery = useMutation({
    mutationFn: addStoreOrder,
    onError: error => {
      console.error(error);
    },
  });

  const invalidateStoreOrderQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  return { addStoreOrder: addStoreOrderQuery.mutate, storeOrderData, invalidateStoreOrderQuery };
};
