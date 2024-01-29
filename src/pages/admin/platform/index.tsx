import AdminLayout from '@/components/layout/admin/AdminLayout';
import PlatForm from '@/components/platform/PlatForm';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const PlatFormPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('플랫폼 관리')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 플렛폼 관리, 플렛폼" />
        <meta name="description" content="magic pos의 플렛폼 관리 페이지 입니다. " />
      </Head>
      <PlatForm />
    </>
  );
};
PlatFormPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default PlatFormPage;
