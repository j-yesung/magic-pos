import {
  addMenuItem,
  removeMenuItem,
  updateMenuItem,
  updateMenuItemPosition,
  uploadMenuItemImage,
} from '@/server/api/supabase/menu-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const enum QUERY_KEY {
  MENU_CATEGORY_WITH_ITEM = 'categoryWithMenu',
}

export const useSetMenuItem = () => {
  const queryClient = useQueryClient();

  const addMutate = useMutation({
    mutationFn: addMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY_WITH_ITEM] });
    },
    onError: error => {
      console.error(error);
    },
  });

  const updateNameMutate = useMutation({
    mutationFn: updateMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY_WITH_ITEM] });
    },
  });
  const updatePositionMutate = useMutation({
    mutationFn: updateMenuItemPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY_WITH_ITEM] });
    },
  });
  const deleteMutate = useMutation({
    mutationFn: removeMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY_WITH_ITEM] });
    },
  });
  const uploadImageMutate = useMutation({
    mutationFn: uploadMenuItemImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MENU_CATEGORY_WITH_ITEM] });
    },
  });

  return {
    addMutate,
    updateNameMutate: updateNameMutate.mutate,
    updatePositionMutate: updatePositionMutate.mutate,
    deleteMutate: deleteMutate.mutate,
    uploadImageMutate,
  };
};

export default useSetMenuItem;