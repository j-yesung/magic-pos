import AdminLayout from '@/components/layout/admin/AdminLayout';
import MenuItemsComponentPage from '@/components/menu-item/MenuItemContainer';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const ItemPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('메뉴 관리')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 메뉴관리, 메뉴 설정" />
        <meta name="description" content="magic pos의 메뉴 관리 페이지 입니다. " />
      </Head>
      <MenuItemsComponentPage />
    </>
  );
};

ItemPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ItemPage;
