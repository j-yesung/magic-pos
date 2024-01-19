import { fetchStoreOrderByOrderIdWithStoreName } from '@/server/api/supabase/order-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEY = 'store-order';
export const useStoreOrderFetchQuery = (orderId: string[], storeId: string) => {
  const queryClient = useQueryClient();

  const { data: storeOrderData } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => {
      return fetchStoreOrderByOrderIdWithStoreName(orderId, storeId);
    },
  });

  const invalidateStoreOrderQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  return { storeOrderData, invalidateStoreOrderQuery };
};
