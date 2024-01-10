import React from 'react';
import SuccessContainer from '@/components/order/success/SuccessContainer';
import { GetServerSideProps } from 'next';
import axios from 'axios';

/**
 * 결제 성공 페이지
 * @constructor
 */
const OrderSuccessPage = ({ payment }: { payment: Payment }) => {
  return <SuccessContainer payment={payment} />;
};

export default OrderSuccessPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { paymentKey, orderId, amount },
  } = context;

  try {
    // 결제 승인
    // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기

    const buffer = Buffer.from(`${process.env.NEXT_PUBLIC_TOSS_WIDGET_SECRET_KEY}:`).toString('base64');

    const { data: payment } = await axios.post<Payment>(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${buffer}`,
        },
      },
    );

    return {
      props: { payment },
    };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    return {
      redirect: {
        destination: `/order/fail?code=${error.response.data.code}&message=${encodeURIComponent(
          error.response.data.message,
        )}`,
        permanent: false,
      },
    };
  }
};
