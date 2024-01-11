import { FetchManagement } from '@/server/api/supabase/management';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  TABLE = 'management',
}

const useFetchManagement = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.TABLE],
    queryFn: () => FetchManagement(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading };
};

export default useFetchManagement;
