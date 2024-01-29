import AdminLayout from '@/components/layout/admin/AdminLayout';
import Management from '@/components/management/Management';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const ManagementPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('운영 모드')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 운영모드, 주문관리, 운영관리" />
        <meta name="description" content="magic pos의 운영모드 페이지 입니다. " />
      </Head>
      <Management />
    </>
  );
};
ManagementPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManagementPage;
