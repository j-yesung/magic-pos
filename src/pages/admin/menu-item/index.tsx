import AdminLayout from '@/components/layout/admin/AdminLayout';
import MenuItemsComponentPage from '@/components/menu-item/MenuItemContainer';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const ItemPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('메뉴 관리')}</title>
      </Head>
      <MenuItemsComponentPage />
    </>
  );
};

ItemPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default ItemPage;
