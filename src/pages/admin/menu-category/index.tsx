import AdminLayout from '@/components/layout/admin/AdminLayout';
import CategoriesComponentPage from '@/components/menu-category/Categories';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const CategoryPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('카테고리 관리')}</title>
      </Head>
      <CategoriesComponentPage />
    </>
  );
};

CategoryPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default CategoryPage;
