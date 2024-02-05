import React, { ReactNode, useEffect, useState } from 'react';
import SuccessContainer from '@/components/kiosk/success/SuccessContainer';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import useKioskState from '@/shared/store/kiosk';
import Waiting from '@/components/kiosk/success/Waiting';
import OrderLayout from '@/components/layout/kiosk/OrderLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { setErrorState } from '@/shared/store/error';
import { PAYMENT_FAIL_PATH, RECEIPT_PATH } from '@/data/url-list';

/**
 * 결제 성공 페이지
 * order -> toss widget을 통한 결제 성공시 이 페이지로 넘어오게 된다.
 * 서버사이드에서 toss 데이터베이스에 데이터를 업로드 시켜야 하기 때문에 getServerSideProps를 사용한다.
 * 성공적으로 업로드 되었을 때 결제승인이 난다..!!
 * 실패할 경우 fail 페이지로 이동한다.
 * @constructor
 */
const OrderSuccessPage = ({ payment, isError }: { payment: Payment; isError: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const orderNumber = useKioskState(state => state.orderNumber);
  const router = useRouter();

  useEffect(() => {
    // 에러이면서 주문번호가 있으면 주문 내역 화면을 보여줍니다.
    if (isError && orderNumber) {
      router.push(RECEIPT_PATH);
      return;
    } else if (isError) {
      // 에러만 있다면 에러 화면을 보여줍니다.
      setErrorState({
        title: '결제 실패',
        message: '주문에 실패하였습니다.',
        subMessage: '다시 결제 시도를 해주세요',
        code: 500,
        link: '/',
      });
      router.push('/error');
      return;
    }

    // payment의 상태가 DONE일 때만 완료 화면을 보여줍니다.
    if (payment && payment.status === 'DONE') {
      setIsPaymentDone(true);
    }
    setIsLoaded(true);
  }, []);

  return <>{isLoaded && (isPaymentDone ? <SuccessContainer payment={payment} /> : <Waiting />)}</>;
};

OrderSuccessPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderSuccessPage;

/**
 * 토스 결제 위젯을 통해 결제 요청후 결제 승인이되면 해당 페이지로 이동됩니다.
 * parma으로 넘어오는 paymentKey를 통해 결제가 승인되고 돌아오는 payment 객체 안에 승인, 실패여부를 알려줍니다.
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { paymentKey, orderId, amount, lang },
  } = context;

  try {
    // 결제 승인
    // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기

    const buffer = Buffer.from(`${process.env.NEXT_PUBLIC_TOSS_WIDGET_SECRET_KEY}:`).toString('base64');

    if (!paymentKey) {
      return {
        props: { isError: true },
      };
    }

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
      props: { payment, isError: false, ...(await serverSideTranslations(lang ? lang.toString() : 'ko', ['common'])) },
    };
  } catch (err: unknown) {
    const error = err as ErrorResponse;

    // 이미 결제가 된 경우 에러를 표시합니다.
    if (error.response.data.code === 'ALREADY_PROCESSED_PAYMENT') {
      return {
        props: { isError: true, ...(await serverSideTranslations(lang ? lang.toString() : 'ko', ['common'])) },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(lang ? lang.toString() : 'ko', ['common'])),
      },
      redirect: {
        destination: `${PAYMENT_FAIL_PATH}?code=${error.response.data.code}&message=${encodeURIComponent(
          error.response.data.message,
        )}`,
        permanent: false,
      },
    };
  }
};
