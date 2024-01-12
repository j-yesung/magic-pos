import User from '@/components/auth/User';
import Head from 'next/head';

const FindPasswordPage = () => {
  return (
    <>
      <Head>
        <title>Magic Pos</title>
        <meta name="description" content="find a password" />
      </Head>
      <User />
    </>
  );
};

export default FindPasswordPage;
