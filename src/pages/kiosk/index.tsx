import React, { ReactNode } from 'react';
import OrderLayout from '@/components/layout/kiosk/OrderLayout';
import IndexPageContainer from '@/components/kiosk/index/IndexPageContainer';

const IndexPage = () => {
  return <IndexPageContainer />;
};

IndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default IndexPage;
