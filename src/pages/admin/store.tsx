import AdminLayout from '@/components/layout/admin/AdminLayout';
import StoreContents from '@/components/store/StoreMain';
import Head from 'next/head';
import { ReactNode } from 'react';

const StorePage = () => {
  return (
    <>
      <Head>
        <title>Magic Pos</title>
        <meta name="description" content="store" />
      </Head>
      <StoreContents />
    </>
  );
};

StorePage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default StorePage;
