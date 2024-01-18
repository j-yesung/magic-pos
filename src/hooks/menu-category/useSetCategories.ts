import { addCategory, removeCategory, updateCategoryName } from '@/server/api/supabase/menu-category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum QUERY_KEY {
  MENU_CATEGORY = 'menu-category',
}

export const useSetCategories = () => {
  const queryClient = useQueryClient();

  const addMutate = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY] });
    },
    onError: error => {
      console.error(error);
    },
  });

  const updateNameMutate = useMutation({
    mutationFn: updateCategoryName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY] });
    },
  });

  const deleteMutate = useMutation({
    mutationFn: removeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY] });
    },
  });

  return {
    addMutate: addMutate.mutate,
    updateNameMutate: updateNameMutate.mutate,
    deleteMutate: deleteMutate.mutate,
  };
};

export default useSetCategories;
