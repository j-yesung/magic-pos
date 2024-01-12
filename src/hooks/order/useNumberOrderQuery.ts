import { useMutation, useQuery } from '@tanstack/react-query';
import { addNumberOrder, fetchNumberOrderByOrderId } from '@/server/api/supabase/order-togo';
import { fetchStoreOrderByOrderId } from '@/server/api/supabase/order-store';

const QUERY_KEY = 'number-order';

/**
 * supabase order_number table CRUD hook
 */
export const useNumberOrderQuery = (orderId?: string) => {
  const { data: numberOrderData } = useQuery({
    queryKey: [QUERY_KEY, orderId],
    queryFn: () => {
      return fetchNumberOrderByOrderId(orderId ?? '');
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
