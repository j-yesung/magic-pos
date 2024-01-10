import { addStoreTable } from '@/server/api/supabase/store-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export const useSetTable = () => {
  const didMount = useRef(false);
  const queryClient = useQueryClient();
  const {
    mutate: addTableMutate,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: addStoreTable,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['table'] });
    },
  });

  useEffect(() => {
    if (didMount.current) {
      () => {
        if (isPending === false) {
          console.log('로딩중');
        }
      };
    } else didMount.current = true;
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);
  return { addTableMutate };
};

export default useSetTable;
