import User from '@/components/auth/User';
import Head from 'next/head';

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>Magic Pos</title>
        <meta name="description" content="signup" />
      </Head>
      <User />
    </>
  );
};

export default SignupPage;
