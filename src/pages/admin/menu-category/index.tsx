import AdminLayout from '@/components/layout/admin/AdminLayout';
import CategoriesComponentPage from '@/components/menu-category/Categories';
import { ReactNode } from 'react';

const CategoryPage = () => {
  return <CategoriesComponentPage />;
};

CategoryPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default CategoryPage;
