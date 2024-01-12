import { useMutation, useQuery } from '@tanstack/react-query';
import { addNumberOrder, fetchNumberOrderByOrderIdWithStoreName } from '@/server/api/supabase/order-togo';

const QUERY_KEY = 'number-order';

/**
 * supabase order_number table CRUD hook
 */
export const useNumberOrderQuery = (orderId?: string) => {
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

  return { addNumberOrder: addNumberOrderMutation.mutate, numberOrderData };
};
