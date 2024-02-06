import { fetchManagement } from '@/server/api/supabase/management';
import { useQuery } from '@tanstack/react-query';

const enum QUERY_KEY {
  MANAGEMENT = 'management',
}

const useFetchManagement = (id?: string) => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEY.MANAGEMENT],
    queryFn: () => fetchManagement(id),
  });

  return { data, isError, isLoading, refetch };
};

export default useFetchManagement;
