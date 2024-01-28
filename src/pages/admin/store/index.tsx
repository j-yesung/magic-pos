import AdminLayout from '@/components/layout/admin/AdminLayout';
import StoreContents from '@/components/store/StoreMain';
import Head from 'next/head';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';

const StorePage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('가게 관리')}</title>
        <meta name="description" content="store" />
      </Head>
      <StoreContents />
    </>
  );
};

StorePage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default StorePage;
