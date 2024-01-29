import HomeLayout from '@/components/layout/home/HomeLayout';
import { makeTitle } from '@/shared/helper';
import Head from 'next/head';
import { ReactNode } from 'react';

const HomePage = () => {
  return (
    <Head>
      <title>{makeTitle('')}</title>
      <meta name="description" content="NextJS Events" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="author" content="매직 포스" />
      <meta
        name="keywords"
        content="magic pos,매직 포스, 키오스크, 웹 키오스크, 키스크, 주문관리, 간편한 결제, QR코드로 결제, 편리함의 시작, 세상의 모든 키오스크가 내손안에,  "
      />
      <meta name="description" content="편리함의 시작 magic pos" />
    </Head>
  );
};

HomePage.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;

export default HomePage;
