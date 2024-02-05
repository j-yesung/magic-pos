import React, { ReactNode, useEffect, useState } from 'react';
import useKioskState from '@/shared/store/kiosk';
import { useRouter } from 'next/router';
import ReceiptContainer from '@/components/kiosk/receipt/ReceiptContainer';
import OrderLayout from '@/components/layout/kiosk/OrderLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

/**
 * 결제 후 주문 내역 확인 페이지
 * @constructor
 */
const OrderReceiptPage = () => {
  const orderId = useKioskState(state => state.orderIdList);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (orderId === null) {
      router.push('/kiosk');
      return;
    }

    setIsLoaded(true);
  }, []);

  return <>{isLoaded ? <ReceiptContainer /> : <div>Loading...</div>}</>;
};

OrderReceiptPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderReceiptPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { lang },
  } = context;

  return {
    props: {
      ...(await serverSideTranslations(lang ? lang.toString() : 'ko', ['common'])),
    },
  };
};
