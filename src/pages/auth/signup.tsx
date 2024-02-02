import Signup from '@/components/auth/form/Signup';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('회원가입')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 회원가입" />
        <meta name="description" content="magic pos의 회원가입 페이지 입니다. " />
      </Head>
      <Signup />
    </>
  );
};

export default SignupPage;
