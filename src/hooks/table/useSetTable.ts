import { addStoreTable, deleteStoreTable, updateStoreTable } from '@/server/api/supabase/store-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useSetTable = () => {
  const queryClient = useQueryClient();
  const {
    mutate: addMutate,
    isError: addIsError,
    error: addError,
    isPending: addIsPending,
  } = useMutation({
    mutationFn: addStoreTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table'] });
    },
  });

  const {
    mutate: updateMutate,
    isError: updateIsError,
    error: updateError,
    isPending: updateIsPending,
  } = useMutation({
    mutationFn: updateStoreTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table'] });
    },
  });

  const {
    mutate: deleteMutate,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteStoreTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table'] });
    },
  });

  useEffect(() => {
    if (addIsError) {
      console.error(addError.message || updateError?.message || deleteError?.message);
    }
  }, [addIsError, updateIsError, deleteIsError, addError, updateError, deleteError]);

  return { addMutate, updateMutate, deleteMutate, addIsPending, updateIsPending };
};

export default useSetTable;
