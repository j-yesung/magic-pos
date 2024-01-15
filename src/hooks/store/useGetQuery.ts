import { getStore } from '@/server/api/supabase/store';
import { useQuery } from '@tanstack/react-query';

const enum QueryKey {
  STORE = 'store',
}

interface StoreData {
  store:
    | {
        business_number: string | null;
        business_name: string | null;
      }[]
    | null;
}

export const useGetQuery = (userId: string) => {
  const { data } = useQuery<StoreData>({
    queryKey: [QueryKey.STORE],
    queryFn: () => getStore(userId),
  });

  return { data };
};
