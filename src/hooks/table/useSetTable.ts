import { addStoreTable, deleteStoreTable, updateStoreTable } from '@/server/api/supabase/store-table';
import useTableStore from '@/shared/store/table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const useSetTable = () => {
  const { refSideBar, refDummySideBar, refSideBarBg } = useTableStore();
  const didMount = useRef(false);
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
    isPending: deleteIsPending,
  } = useMutation({
    mutationFn: deleteStoreTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table'] });
    },
  });



  useEffect(() => {
    if (didMount.current) {
      if (addIsPending || updateIsPending || deleteIsPending) {
        refSideBar?.current?.style.setProperty('right', '-18%')
        refDummySideBar?.current?.style.setProperty('width', '0%')
        refSideBarBg?.current?.style.setProperty('visibility', 'hidden')
        refSideBarBg?.current?.style.setProperty('opacity', '0%')
      }
    } else {
      didMount.current = true
    };
  }, [addIsPending, updateIsPending, deleteIsPending]);

  useEffect(() => {
    if (addIsError) {
      console.error(addError.message || updateError?.message || deleteError?.message);
    }
  }, [addIsError, updateIsError, deleteIsError, addError, updateError, deleteError]);

  return { addMutate, updateMutate, deleteMutate };
};

export default useSetTable;
