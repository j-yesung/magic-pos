import AdminLayout from '@/components/layout/admin/AdminLayout';
import Table from '@/components/table/Table';
import Head from 'next/head';
import { ReactNode } from 'react';

const TablePage = () => {
  return (
    <>
      <Head>
        <title>magic pos 테이블 관리</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="파워레인조" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 테이블 관리" />
        <meta name="description" content="magic pos의 테이블을 관리하는 페이지 입니다. " />
      </Head>
      <Table />
    </>
  );
};

TablePage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default TablePage;
