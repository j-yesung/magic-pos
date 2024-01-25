import AdminLayout from '@/components/layout/admin/AdminLayout';
import Management from '@/components/management/Management';
import Head from 'next/head';
import { ReactNode } from 'react';

const ManagementPage = () => {
  return (
    <>
      <style jsx global>{`
        @media only all and (max-width: 1520px) {
          html {
            font-size: 8px;
          }
        }
      `}</style>
      <Head>
        <title>magic pos 운영모드</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Management />
    </>
  );
};
ManagementPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManagementPage;
