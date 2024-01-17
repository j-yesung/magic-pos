import useFetchManagement from '@/hooks/management/useFetchManagement';
import useFetchCategories from '@/hooks/menu/useCategories';
import useAuthStore from '@/shared/store/auth';
import useCategoriesStore from '@/shared/store/menu-category';
import { useEffect } from 'react';
import CategoryComponentPage from './Category';
import CategoryFormPage from './Form';

const CategoriesComponentPage = () => {
  const { auth } = useAuthStore();
  const id = auth?.user.id;
  const { data: managementData } = useFetchManagement(id);
  const storeId = managementData?.[0]?.id ?? '';
  const { data: categoreisData } = useFetchCategories(storeId);
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
