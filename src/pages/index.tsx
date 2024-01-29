import HomeLayout from '@/components/layout/home/HomeLayout';
import Head from 'next/head';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';

const HomePage = () => {
  return (
    <Head>
      <title>{makeTitle('')}</title>
      <meta name="description" content="magic pos in the palm of your hand" />
    </Head>
  );
};

HomePage.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;

export default HomePage;
