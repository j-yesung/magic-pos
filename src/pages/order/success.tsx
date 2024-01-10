import React from 'react';
import SuccessContainer from '@/components/order/success/SuccessContainer';
import { GetServerSideProps } from 'next';
import axios from 'axios';

/**
 * 결제 성공 페이지
 * order -> toss widget을 통한 결제 성공시 이 페이지로 넘어오게 된다.
 * 서버사이드에서 toss 데이터베이스에 데이터를 업로드 시켜야 하기 때문에 getServerSideProps를 사용한다.
 * 성공적으로 업로드 되었을 때 결제승인이 난다..!!
 * 실패할 경우 fail 페이지로 이동한다.
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
