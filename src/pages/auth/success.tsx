import User from '@/components/auth/User';
import Head from 'next/head';

const SingupSuccessPage = () => {
  return (
    <>
      <Head>
        <title>Magic Pos</title>
        <meta name="description" content="signupSuccess" />
      </Head>
      <User />
    </>
  );
};

export default SingupSuccessPage;
