import User from '@/components/auth/User';
import Head from 'next/head';
import { makeTitle } from '@/shared/helper';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('로그인')}</title>
        <meta name="description" content="login" />
      </Head>
      <User />
    </>
  );
};

export default LoginPage;
