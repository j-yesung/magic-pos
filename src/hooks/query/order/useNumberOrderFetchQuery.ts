import { fetchNumberOrderByOrderIdWithStoreName } from '@/server/api/supabase/order-togo';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const QUERY_KEY = 'number-order';

export const useNumberOrderFetchQuery = (orderId: string[], storeId: string) => {
  const queryClient = useQueryClient();

  const { data: numberOrderData, isFetching: isNumberOrderFetching } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    enabled: orderId.length > 0,
    refetchOnWindowFocus: false,
    queryFn: () => {
      return fetchNumberOrderByOrderIdWithStoreName(orderId, storeId);
    },
  });

  const invalidateNumberOrderQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  return { numberOrderData, invalidateNumberOrderQuery, isNumberOrderFetching };
};
