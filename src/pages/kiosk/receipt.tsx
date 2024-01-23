import React, { ReactNode, useEffect, useState } from 'react';
import useOrderState from '@/shared/store/order';
import { useRouter } from 'next/router';
import ReceiptContainer from '@/components/kiosk/receipt/ReceiptContainer';
import OrderLayout from '@/components/layout/order/OrderLayout';

/**
 * 결제 후 주문 내역 확인 페이지
 * @constructor
 */
const OrderReceiptPage = () => {
  const orderId = useOrderState(state => state.orderIdList);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // orderId가 null이면 에러 페이지!
    if (orderId === null) {
      router.push('/error');
      return;
    }

    setIsLoaded(true);
  }, []);

  return <>{isLoaded ? <ReceiptContainer /> : <div>Loading...</div>}</>;
};

OrderReceiptPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderReceiptPage;
