import { getStoreBnoNumber } from '@/server/api/supabase/store';
import { useQuery } from '@tanstack/react-query';

const enum QueryKey {
  STORE = 'store',
}

interface StoreData {
  store:
    | {
        business_number: string | null;
      }[]
    | null;
}

export const useGetQuery = (userId: string) => {
  const { data: storeBnoNumber } = useQuery<StoreData>({
    queryKey: [QueryKey.STORE],
    queryFn: () => getStoreBnoNumber(userId),
  });

  return { storeBnoNumber };
};
