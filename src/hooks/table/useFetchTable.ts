import { fetchStoreTable, fetchTableInfoById } from '@/server/api/supabase/store-table';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const enum QUERY_KEY {
  TABLE = 'table',
}

const useFetchTable = ({ userId, tableId, storeId }: { userId?: string; tableId?: string; storeId?: string }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.TABLE, userId],
    queryFn: () => fetchStoreTable(userId ?? ''),
    enabled: !!userId,
  });

  const { data: tableInfo, isFetching: isTableFetching } = useQuery({
    queryKey: [QUERY_KEY.TABLE, tableId],
    queryFn: () => fetchTableInfoById(tableId ?? '', storeId ?? ''),
    enabled: !!tableId && !!storeId,
  });

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading, tableInfo, isTableFetching };
};

export default useFetchTable;
