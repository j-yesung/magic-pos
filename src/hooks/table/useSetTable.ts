import { addStoreTable, updateStoreTable } from '@/pages/api/store-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const useSetTable = () => {
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



  useEffect(() => {
    if (didMount.current) {
      () => {
        if (addIsPending || updateIsPending) {
          console.log('로딩중');
        }
      };
    } else didMount.current = true;
  }, [addIsPending, updateIsPending]);

  useEffect(() => {
    if (addIsError) {
      console.error(addError.message || updateError?.message);
    } updateError
  }, [addIsError, updateIsError, addError, updateError]);
  return { addMutate, updateMutate };
};

export default useSetTable;
