import React, { ReactNode } from 'react';
import OrderLayout from '@/components/layout/order/OrderLayout';
import ErrorContainer from '@/components/error/ErrorContainer';

/**
 * 결제 실패 페이지
 * @constructor
 */
const OrderFailPage = () => {
  return (
    <div>
      <ErrorContainer />
    </div>
  );
};

OrderFailPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderFailPage;
