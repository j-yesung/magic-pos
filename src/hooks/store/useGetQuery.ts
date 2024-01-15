import { getStore } from '@/server/api/supabase/store';
import { useQuery } from '@tanstack/react-query';

const enum QueryKey {
  STORE = 'store',
}

export const useGetQuery = (userId: string) => {
  const { data } = useQuery({
    queryKey: [QueryKey.STORE],
    queryFn: () => getStore(userId),
  });

  return { data };
};
