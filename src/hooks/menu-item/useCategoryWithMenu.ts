import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const enum QUERY_KEY {
  MENU_CATEGORY_WITH_ITEM = 'categoryWithMenu',
}

const useFetchCategoryWithMenu = (id: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QUERY_KEY.MENU_CATEGORY_WITH_ITEM],
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
