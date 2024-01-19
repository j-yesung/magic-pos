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

  const incrementOrderNumberMutation = useMutation({
    mutationFn: incrementOrderNumber,
    onSuccess: ({ orderNumber, error }) => {
      if (!error) setOrderNumber(orderNumber ?? -1);
      else console.error(error);
      return { orderNumber };
    },
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
    incrementOrderNumber: incrementOrderNumberMutation.mutate,
    updateStoreTimeSet: updateStoreTimeSetMutation.mutate,
  };
};
