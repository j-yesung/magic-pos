import { incrementOrderNumber, updateStoreTime } from '@/server/api/supabase/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStoreUseTable } from '../../../server/api/supabase/store';
import useToast from '../../service/ui/useToast';

const enum StoreKey {
  STORE_UPDATE_TIME = 'storeUpdateTime',
  STORE_UPDATE_TABLE = 'storeUpdateTable',
}

/**
 * supabase store table CRUD hook
 */
export const useStoreSetQuery = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
      toast('영업시간이 변경되었습니다.', {
        type: 'success',
        position: 'top-right',
        showCloseButton: false,
        autoClose: 2000,
      });
    },
    onError: error => {
      console.error(error);
    },
  });

  const updateStoreUseTableMutation = useMutation({
    mutationFn: updateStoreUseTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [StoreKey.STORE_UPDATE_TABLE] });
      toast('변경이 완료되었습니다.', {
        type: 'success',
        position: 'top-right',
        showCloseButton: false,
        autoClose: 2000,
      });
    },
    onError: error => {
      console.error(error);
    },
  });

  return {
    newOrderNumber: incrementResult?.orderNumber,
    incrementOrderNumber: incrementOrderNumberMutation,
    updateStoreTimeSet: updateStoreTimeSetMutation.mutate,
    updateStoreUseTable: updateStoreUseTableMutation.mutateAsync,
  };
};
