import HomeLayout from '@/components/layout/home/HomeLayout';
import Head from 'next/head';
import { ReactNode } from 'react';

const HomePage = () => {
  return (
    <Head>
      <title>Magic Pos</title>
      <meta name="description" content="magic pos in the palm of your hand" />
    </Head>
  );
};

HomePage.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;

export default HomePage;
