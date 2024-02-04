import AdminLayout from '@/components/layout/admin/AdminLayout';
import StoreContents from '@/components/store/StoreMain';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const StorePage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('가게 설정')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 가게관리 가게 설정" />
        <meta name="description" content="magic pos의 가게 관리 페이지 입니다. " />
      </Head>
      <StoreContents />
    </>
  );
};

StorePage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default StorePage;
