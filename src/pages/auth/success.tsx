import SignupSuccess from '@/components/auth/form/SignupSuccess';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const SingupSuccessPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('회원가입 완료')}</title>
        <meta name="description" content="signupSuccess" />
      </Head>
      <SignupSuccess />
    </>
  );
};

export default SingupSuccessPage;
