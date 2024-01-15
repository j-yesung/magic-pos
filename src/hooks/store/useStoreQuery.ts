import { incrementOrderNumber, updateStoreInfomation } from '@/server/api/supabase/store';
import useOrderStore from '@/shared/store/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum QueryKey {
  STORE = 'store',
}

/**
 * supabase store table CRUD hook
 */
export const useStoreQuery = () => {
  const { setOrderNumber } = useOrderStore();
  const queryClient = useQueryClient();

  const incrementOrderNumberMutation = useMutation({
    mutationFn: incrementOrderNumber,
    onSuccess: ({ orderNumber, error }) => {
      if (!error) setOrderNumber(orderNumber ?? -1);
      else console.error(error);
    },
    onError: error => {
      console.error(error);
    },
  });

  const updateStoreInfomationMutation = useMutation({
    mutationFn: updateStoreInfomation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.STORE] });
      alert('저장되었습니다.');
    },
    onError: error => {
      console.error(error);
    },
  });

  return {
    incrementOrderNumber: incrementOrderNumberMutation.mutate,
    updateStoreInfomation: updateStoreInfomationMutation.mutate,
  };
};
