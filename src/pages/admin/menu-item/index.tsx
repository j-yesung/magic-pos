import AdminLayout from '@/components/layout/admin/AdminLayout';
import MenuItemsComponentPage from '@/components/menu-item/MenuItemContainer';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase//menu-category';
import { CategoryWithMenuItem } from '@/types/supabase';
import { GetStaticProps } from 'next';
import { ReactNode } from 'react';

interface PropsType {
  categoryWithMenuData: CategoryWithMenuItem[];
  storeId: string;
}

const CategoryPage = (props: PropsType) => {
  return <MenuItemsComponentPage {...props} />;
};

CategoryPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async () => {
  const storeId = '0c4b3064-7983-42a7-9e92-207373b019ad';
  const { data: categoryWithMenuData } = await fetchCategoriesWithMenuItemByStoreId(storeId);

  return {
    props: {
      categoryWithMenuData,
      storeId,
    },
  };
};