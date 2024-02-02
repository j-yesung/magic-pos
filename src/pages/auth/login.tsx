import Login from '@/components/auth/form/Login';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('로그인')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 로그인" />
        <meta name="description" content="magic pos의 로그인 페이지 입니다. " />
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
