import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  TABLE = 'categoryWithMenu',
}

const useFetchCategoryWithMenu = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.TABLE],
    queryFn: () => fetchCategoriesWithMenuItemByStoreId(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      console.error(error.message);
    }
  }, [isError, error]);

  return { data, isLoading };
};

export default useFetchCategoryWithMenu;
