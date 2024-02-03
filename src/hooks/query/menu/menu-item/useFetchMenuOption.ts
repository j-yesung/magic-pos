import { fetchMenuOptions } from '@/server/api/supabase/menu-item';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  MENU_OPTION = 'menuOption',
}

const useFetchMenuOptions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.MENU_OPTION],
    queryFn: () => fetchMenuOptions(),
  });

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading };
};

export default useFetchMenuOptions;
