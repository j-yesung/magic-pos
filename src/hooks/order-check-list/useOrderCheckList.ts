import { fetchOrderCheckList } from "@/server/api/supabase/order-check-list";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


const enum QUERY_KEY {
  ORDER_CHECK_LIST = 'order-check-list',
}

const useOrderCheckList = (id?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.ORDER_CHECK_LIST],
    queryFn: () => fetchOrderCheckList(id),
  })




  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);


  return { data, isLoading }
}

export default useOrderCheckList