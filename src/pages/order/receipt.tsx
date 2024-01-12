import React, { ReactNode, useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import { useRouter } from 'next/router';
import ReceiptContainer from '@/components/order/receipt/ReceiptContainer';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useNumberOrderQuery } from '@/hooks/order/useNumberOrderQuery';

const OrderReceiptPage = () => {
  const { orderId } = useOrderStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { storeOrderData } = useStoreOrderQuery(orderId ?? '');
  const { numberOrderData } = useNumberOrderQuery(orderId ?? '');

  useEffect(() => {
    // orderId가 null이면 에러 페이지!
    console.log(orderId);
    if (orderId === null) {
      // router.push('/error');
      // return;
    }
    console.log(storeOrderData);
    console.log(numberOrderData);

    setIsLoaded(true);
  }, []);

  return <>{isLoaded ? <ReceiptContainer /> : <div>Loading...</div>}</>;
};

OrderReceiptPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderReceiptPage;
