import { fetchStoreTable } from '@/pages/api/store-table';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  TABLE = 'table',
}

const useFetchTable = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.TABLE],
    queryFn: () => fetchStoreTable(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      console.log(error.message);
    }
  }, [isError, error]);

  return { data, isLoading };
};

export default useFetchTable;
