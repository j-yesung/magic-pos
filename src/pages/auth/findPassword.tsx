import FindPassword from '@/components/auth/form/FindPassword';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';

const FindPasswordPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('비밀번호 찾기')}</title>
        <meta name="description" content="find a password" />
      </Head>
      <FindPassword />
    </>
  );
};

export default FindPasswordPage;
