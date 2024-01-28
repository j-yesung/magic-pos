import AdminLayout from '@/components/layout/admin/AdminLayout';
import Sales from '@/components/sales/Sales';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const SalesPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('매출 관리')}</title>
      </Head>
      <Sales />
    </>
  );
};
SalesPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default SalesPage;
