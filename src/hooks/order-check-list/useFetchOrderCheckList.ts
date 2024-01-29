import { fetchOrderCheckList } from '@/server/api/supabase/order-check-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  ORDER_CHECK_LIST = 'order-check-list',
}
const useFetchOrderCheckList = (id?: string, listType?: string) => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
    {
      queryKey: [QUERY_KEY.ORDER_CHECK_LIST, id, listType],
      queryFn: ({ pageParam }) => fetchOrderCheckList(pageParam, id, listType),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPage) => {
        if (lastPage) {
          if (lastPage?.length === 0) {
            return;
          } else {
            return allPage.length;
          }
        }
      },
      select: data => {
        return data.pages.map(pageData => pageData).flat();
      },
    },
  );

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, refetch };
};

export default useFetchOrderCheckList;
