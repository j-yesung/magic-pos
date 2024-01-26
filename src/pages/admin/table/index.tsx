import AdminLayout from '@/components/layout/admin/AdminLayout';
import Table from '@/components/table/Table';
import Head from 'next/head';
import { ReactNode } from 'react';

const TablePage = () => {
  return (
    <div>
      <Head>
        <title>magic pos 테이블 관리</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Table />
    </div>
  );
};

TablePage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default TablePage;
