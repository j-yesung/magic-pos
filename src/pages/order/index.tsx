import React, { ReactElement } from 'react';
import Layout from '@/components/layout/order/Layout';
import { NextPageWithLayout } from '@/types/common';

const OrderIndexPage: NextPageWithLayout = () => {
  return (
    <div>
      <button>포장</button>
      <button>매장</button>
    </div>
  );
};

OrderIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default OrderIndexPage;
