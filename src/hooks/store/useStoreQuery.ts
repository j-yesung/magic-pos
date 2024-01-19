import { incrementOrderNumber, updateStoreTime } from '@/server/api/supabase/store';
import { setOrderNumber } from '@/shared/store/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum StoreKey {
  STORE_UPDATE_TIME = 'storeUpdateTime',
}

/**
 * supabase store table CRUD hook
 */
export const useStoreQuery = () => {
  const queryClient = useQueryClient();

  const { data: incrementResult, mutate: incrementOrderNumberMutation } = useMutation({
    mutationFn: incrementOrderNumber,
    onError: error => {
      console.error(error);
    },
  });

  const updateStoreTimeSetMutation = useMutation({
    mutationFn: updateStoreTime,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [StoreKey.STORE_UPDATE_TIME] });
      alert('영업 시간이 변경되었습니다.');
    },
    onError: error => {
      console.error(error);
    },
  });

  return {
    newOrderNumber: incrementResult?.orderNumber,
    incrementOrderNumber: incrementOrderNumberMutation,
    updateStoreTimeSet: updateStoreTimeSetMutation.mutate,
  };
};
