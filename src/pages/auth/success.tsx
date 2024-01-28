import User from '@/components/auth/User';
import Head from 'next/head';
import { makeTitle } from '@/shared/helper';

const SingupSuccessPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('회원가입')}</title>
        <meta name="description" content="signupSuccess" />
      </Head>
      <User />
    </>
  );
};

export default SingupSuccessPage;
