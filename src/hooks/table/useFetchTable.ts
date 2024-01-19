import { fetchStoreTable, fetchTableInfoById } from '@/server/api/supabase/store-table';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  TABLE = 'table',
}

const useFetchTable = ({ userId, tableId }: { userId?: string; tableId?: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.TABLE, userId],
    queryFn: () => fetchStoreTable(userId ?? ''),
    enabled: !!userId,
  });

  const { data: tableInfo } = useQuery({
    queryKey: [QUERY_KEY.TABLE, tableId],
    queryFn: () => fetchTableInfoById(tableId ?? ''),
    enabled: !!tableId,
  });

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading, tableInfo };
};

export default useFetchTable;
