import { useMutation } from '@tanstack/react-query';
import { addSales } from '@/server/api/supabase/sales';

/**
 * sales table CRUD hook
 */
export const useSalesQuery = () => {
  const addSalesMutation = useMutation({
    mutationFn: addSales,
    onSuccess: async () => {},
    onError: error => {
      console.error(error);
    },
  });

  return { addSales: addSalesMutation.mutate };
};
