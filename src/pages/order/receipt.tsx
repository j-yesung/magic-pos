import React, { useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import { useRouter } from 'next/router';
import ReceiptContainer from '@/components/order/receipt/ReceiptContainer';

const Receipt = () => {
  const { orderType, orderNumber } = useOrderStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 번호가 0이면 에러 페이지!
    if (orderNumber === 0) {
      // router.push('/error');
      // return;
    }

    setIsLoaded(true);
  }, []);

  return <>{isLoaded ? <ReceiptContainer /> : <div>Loading...</div>}</>;
};

export default Receipt;
