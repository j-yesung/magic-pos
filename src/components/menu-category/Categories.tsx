import { useFetchCategories } from '@/hooks/menu-category/useFetchCategories';
import useAuthStore from '@/shared/store/auth';
import useCategoriesStore from '@/shared/store/menu-category';
import { useEffect } from 'react';
import CategoryComponentPage from './Category';
import CategoryFormPage from './Form';

const CategoriesComponentPage = () => {
  const { storeId } = useAuthStore();
  const { data: categoreisData } = useFetchCategories(storeId ?? '');
  const { category, setCategory, setCategories } = useCategoriesStore();

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

  return (
    <>
      <CategoryComponentPage />
      <CategoryFormPage />
    </>
  );
};

export default CategoriesComponentPage;
