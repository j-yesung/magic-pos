import User from '@/components/auth/User';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Magic Pos</title>
        <meta name="description" content="login" />
      </Head>
      <User />
    </>
  );
};

export default LoginPage;
