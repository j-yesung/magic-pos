import { fetchManagement } from '@/server/api/supabase/management';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  TABLE = 'management',
}

const useFetchManagement = (id?: string) => {

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: [QUERY_KEY.TABLE],
    queryFn: () => fetchManagement(id),
  });






  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading, refetch };
};

export default useFetchManagement;
