import User from '@/components/auth/User';
import Head from 'next/head';

const ResetPage = () => {
  return (
    <>
      <Head>
        <title>Magic Pos</title>
        <meta name="description" content="password reset" />
      </Head>
      <User />
    </>
  );
};

export default ResetPage;
