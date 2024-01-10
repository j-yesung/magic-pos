import { useMutation } from '@tanstack/react-query';
import { addSales } from '@/server/api/supabase/sales';

const QUERY_KEY = 'sales';

export const useSales = () => {
  const addSalesMutation = useMutation({
    mutationFn: addSales,
    onSuccess: async () => {},
    onError: error => {
      console.error(error);
    },
  });

  return { addSales: addSalesMutation.mutate };
};
