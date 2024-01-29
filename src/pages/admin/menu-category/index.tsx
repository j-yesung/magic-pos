import AdminLayout from '@/components/layout/admin/AdminLayout';
import CategoriesComponentPage from '@/components/menu-category/Categories';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const CategoryPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('카테고리 관리')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 카테고리 관리, 카테고리 설정" />
        <meta name="description" content="magic pos의 카테고리 관리 페이지 입니다. " />
      </Head>
      <CategoriesComponentPage />
    </>
  );
};

CategoryPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default CategoryPage;
