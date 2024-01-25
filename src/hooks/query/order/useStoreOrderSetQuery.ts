import { useMutation } from '@tanstack/react-query';
import { addStoreOrder } from '@/server/api/supabase/order-store';

/**
 * supabase order_store table CRUD hook
 */
export const useStoreOrderSetQuery = () => {
  const addStoreOrderQuery = useMutation({
    mutationFn: addStoreOrder,
    onError: error => {
      console.error(error);
    },
  });

  return { addStoreOrder: addStoreOrderQuery.mutate };
};
