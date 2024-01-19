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
        console.log(allPage.length)
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

// const queryOption: Auction_option = {
//   searchKeyword: "",
//   categories: selectedCategories,
//   limit: 20, // 한 페이지당 아이템 수
//   offset: 0, // 시작 위치
//   orderBy: "created_at", // 정렬 기준
//   order: false, // 오름차순 또는 내림차순
// };

//   initialPageParam: 0, // 초기 페이지 파라미터
//   getNextPageParam: (lastPage, allPages) => {
//     // 다음 페이지를 결정하는 함수
//     if (lastPage.length < queryOption.limit!) {
//       return null; // 더 이상 불러올 데이터가 없음
//     }
//     return allPages.length * queryOption.limit!;
//   },
//   select: (data) => {
//     // 데이터 선택 및 변환
//     return data.pages.reduce((a, c) => a.concat(c), []);
//   },
// });