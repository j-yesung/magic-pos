import { fetchStoreInfoById, getStore } from '@/server/api/supabase/store';
import { useQuery } from '@tanstack/react-query';

const enum QueryKey {
  STORE = 'store',
}

export const useGetQuery = ({ userId, storeId }: { userId?: string; storeId?: string }) => {
  const { data } = useQuery({
    queryKey: [QueryKey.STORE, userId],
    enabled: !!userId,
    queryFn: () => getStore(userId ?? ''),
  });

  const { data: storeInfo } = useQuery({
    queryKey: [QueryKey.STORE, storeId],
    enabled: !!storeId,
    queryFn: () => fetchStoreInfoById(storeId ?? ''),
  });

  return { data, storeInfo };
};