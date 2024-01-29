import User from '@/components/auth/User';
import Head from 'next/head';
import { makeTitle } from '@/shared/helper';

const ResetPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('비밀번호 변경')}</title>
        <meta name="description" content="password reset" />
      </Head>
      <User />
    </>
  );
};

export default ResetPage;
