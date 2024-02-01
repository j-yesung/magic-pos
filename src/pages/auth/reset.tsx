import ResetPassword from '@/components/auth/form/ResetPassword';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const ResetPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('비밀번호 변경')}</title>
        <meta name="description" content="password reset" />
      </Head>
      <ResetPassword />
    </>
  );
};

export default ResetPage;
