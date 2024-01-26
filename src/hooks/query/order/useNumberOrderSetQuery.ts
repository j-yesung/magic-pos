import { useMutation } from '@tanstack/react-query';
import { addNumberOrder } from '@/server/api/supabase/order-togo';

/**
 * supabase order_number table CRUD hook
 */
export const useNumberOrderSetQuery = () => {
  const addNumberOrderMutation = useMutation({
    mutationFn: addNumberOrder,
    onError: error => {
      console.error(error);
    },
  });

  return { addNumberOrder: addNumberOrderMutation.mutate };
};
