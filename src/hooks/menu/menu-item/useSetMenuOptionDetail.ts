import {
  addMenuOptionDetail,
  addUpsertMenuOptionDetail,
  removeMenuOptionDetail,
  updateMenuOptionDetail,
} from '@/server/api/supabase/menu-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum QUERY_KEY {
  MENU_OPTION_DETAIL = 'menuOptionDetail',
}

export const useSetMenuOptionDetail = () => {
  const queryClient = useQueryClient();

  const addMutate = useMutation({
    mutationFn: addMenuOptionDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION_DETAIL] });
    },
    onError: error => {
      console.error(error);
    },
  });

  const addUpsertMutate = useMutation({
    mutationFn: addUpsertMenuOptionDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION_DETAIL] });
    },
    onError: error => {
      console.error(error);
    },
  });

  const updateMutate = useMutation({
    mutationFn: updateMenuOptionDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION_DETAIL] });
    },
  });

  const deleteMutate = useMutation({
    mutationFn: removeMenuOptionDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION_DETAIL] });
    },
  });

  return {
    addOptionDetailMutate: addMutate.mutate,
    addUpsertOptionDetailMutate: addUpsertMutate.mutate,
    updateOptionDetailMutate: updateMutate.mutate,
    removeOptionDetailMutate: deleteMutate.mutate,
  };
};

export default useSetMenuOptionDetail;
