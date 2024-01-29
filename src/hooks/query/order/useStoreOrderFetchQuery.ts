import { fetchStoreOrderByOrderIdWithStoreName } from '@/server/api/supabase/order-store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEY = 'store-order';
export const useStoreOrderFetchQuery = (orderId: string[], storeId: string) => {
  const queryClient = useQueryClient();

  const { data: storeOrderData, isFetching: isStoreOrderFetching } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    enabled: orderId.length > 0,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return fetchStoreOrderByOrderIdWithStoreName(orderId, storeId);
    },
  });

  const invalidateStoreOrderQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  return { storeOrderData, invalidateStoreOrderQuery, isStoreOrderFetching };
};
