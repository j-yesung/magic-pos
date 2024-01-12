import React, { ReactNode, useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import { useRouter } from 'next/router';
import ReceiptContainer from '@/components/order/receipt/ReceiptContainer';
import OrderLayout from '@/components/layout/order/OrderLayout';

const OrderReceiptPage = () => {
  const { orderId } = useOrderStore();
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
