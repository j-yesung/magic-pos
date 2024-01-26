import { updateIsDone } from '@/server/api/supabase/management';
import useManagementStore from '@/shared/store/management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const useSetManagement = () => {
  const didMount = useRef(false);
  const queryClient = useQueryClient();
  const { setIsSideBar } = useManagementStore();

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: updateIsDone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['management'] });
    },
  });

  useEffect(() => {
    if (didMount.current) {
      if (!isPending) {
        setIsSideBar();
      }
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { mutate, isPending };
};

export default useSetManagement;
