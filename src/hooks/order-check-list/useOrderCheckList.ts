import { fetchOrderCheckList } from "@/server/api/supabase/order-check-list";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


const enum QUERY_KEY {
  ORDER_CHECK_LIST = 'order-check-list',
}
const useOrderCheckList = (id?: string) => {
  const queryClient = useQueryClient();
  const aaa = queryClient.getQueryData(['management'])
  console.log(aaa)
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.ORDER_CHECK_LIST, id],
    queryFn: ({ pageParam = 1 }) => fetchOrderCheckList(id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage?.length === 0) {
        return;
      } else {
        return allPage.length + 1
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData).flat()
    },

  })



  console.log(data)

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);


  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage }
}

export default useOrderCheckList
