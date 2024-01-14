import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNumberOrder, fetchNumberOrderByOrderIdWithStoreName } from '@/server/api/supabase/order-togo';

const QUERY_KEY = 'number-order';

/**
 * supabase order_number table CRUD hook
 */
export const useNumberOrderQuery = (orderId?: string) => {
  const queryClient = useQueryClient();

  const { data: numberOrderData } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => {
      return fetchNumberOrderByOrderIdWithStoreName(orderId ?? '');
    },
  });

  const addNumberOrderMutation = useMutation({
    mutationFn: addNumberOrder,
    onError: error => {
      console.error(error);
    },
  });

  const invalidateNumberOrderQuery = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  };

  return { addNumberOrder: addNumberOrderMutation.mutate, numberOrderData, invalidateNumberOrderQuery };
};
