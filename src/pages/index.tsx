import HomeLayout from '@/components/layout/home/HomeLayout';
import { ReactNode } from 'react';

const HomePage = () => {
  return <></>;
};

HomePage.getLayout = (page: ReactNode) => <HomeLayout>{page}</HomeLayout>;

export default HomePage;
