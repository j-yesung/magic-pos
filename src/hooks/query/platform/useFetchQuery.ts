import { fetchPlatForm } from '@/server/api/supabase/platform';
import { useQuery } from '@tanstack/react-query';
import { PlatFormQueryKey } from './platformQueryKey';

const usePlatFormQuery = ({ storeId }: { storeId: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [PlatFormQueryKey.PLATFORM],
    queryFn: async () => fetchPlatForm(storeId),
  });

  return { data, isLoading };
};

export default usePlatFormQuery;
