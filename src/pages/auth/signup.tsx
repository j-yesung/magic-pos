import User from '@/components/auth/User';
import Head from 'next/head';
import { makeTitle } from '@/shared/helper';

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('회원가입')}</title>
        <meta name="description" content="signup" />
      </Head>
      <User />
    </>
  );
};

export default SignupPage;
