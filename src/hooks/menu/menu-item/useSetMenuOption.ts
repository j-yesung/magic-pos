import { addMenuOption, removeMenuOption, updateMenuOption } from '@/server/api/supabase/menu-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum QUERY_KEY {
  MENU_OPTION = 'menuOption',
}

export const useSetMenuOption = () => {
  const queryClient = useQueryClient();

  const addMutate = useMutation({
    mutationFn: addMenuOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION] });
    },
    onError: error => {
      console.error(error);
    },
  });

  const updateMutate = useMutation({
    mutationFn: updateMenuOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION] });
    },
  });

  const removeMutate = useMutation({
    mutationFn: removeMenuOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_OPTION] });
    },
  });

  return {
    addOptionMutate: addMutate.mutateAsync,
    updateOptionMutate: updateMutate.mutate,
    removeOptionMutate: removeMutate.mutate,
  };
};

export default useSetMenuOption;
