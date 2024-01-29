import AdminLayout from '@/components/layout/admin/AdminLayout';
import Sales from '@/components/sales/Sales';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const SalesPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('매출 관리')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 메출관리, 달력으로메출 관리, 차트로 메출관리" />
        <meta name="description" content="magic pos의 메출 관리 페이지 입니다. " />
      </Head>
      <Sales />
    </>
  );
};
SalesPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default SalesPage;
