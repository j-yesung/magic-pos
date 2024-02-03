import { fetchCategories } from '@/server/api/supabase/menu-category';
import { useQuery } from '@tanstack/react-query';

const enum QUERY_KEY {
  MENU_CATEGORY = 'menu-category',
}

export const useFetchCategories = (id: string) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.MENU_CATEGORY],
    queryFn: () => fetchCategories(id),
  });

  return { data };
};
