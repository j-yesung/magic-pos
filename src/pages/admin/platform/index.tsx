import AdminLayout from '@/components/layout/admin/AdminLayout';
import PlatForm from '@/components/platform/PlatForm';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const PlatFormPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('플랫폼 관리')}</title>
      </Head>
      <PlatForm />
    </>
  );
};
PlatFormPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default PlatFormPage;
