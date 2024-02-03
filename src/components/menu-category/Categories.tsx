import { useFetchCategories } from '@/hooks/query/menu/menu-category/useFetchCategories';
import useCategoriesStore, { setCategories, setCategory } from '@/shared/store/menu/menu-category';
import useAuthState from '@/shared/store/session';
import { useEffect } from 'react';
import CategoryComponentPage from './container/card/Category';

const CategoriesComponentPage = () => {
  const storeId = useAuthState(state => state.storeId);
  const { data: categoreisData } = useFetchCategories(storeId ?? '');
  const category = useCategoriesStore(state => state.category);

  useEffect(() => {
    if (categoreisData?.error === null) {
      setCategories(categoreisData?.data);
      setCategory({
        ...category,
        store_id: storeId ?? '',
        position: categoreisData?.data.length,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoreisData]);

  return <CategoryComponentPage />;
};

export default CategoriesComponentPage;
