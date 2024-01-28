import User from '@/components/auth/User';
import Head from 'next/head';
import { makeTitle } from '@/shared/helper';

const FindPasswordPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('비밀번호 찾기')}</title>
        <meta name="description" content="find a password" />
      </Head>
      <User />
    </>
  );
};

export default FindPasswordPage;
