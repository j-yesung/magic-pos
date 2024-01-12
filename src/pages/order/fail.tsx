import React, { ReactNode } from 'react';
import OrderLayout from '@/components/layout/order/OrderLayout';
import OrderIndexPage from '@/pages/order/[storeId]';

/**
 * 결제 실패 페이지
 * @constructor
 */
const OrderFailPage = () => {
  return <div>결제 실패...!!</div>;
};

OrderFailPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderFailPage;
