import { useQuery } from '@tanstack/react-query';
import { ANONYMOUS, loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { Tables } from '@/types/supabase';
import { nanoid } from 'nanoid';

/**
 * toss widget을 렌더링 하기 위한 비동기 함수를 호출한다.
 * @param clientKey
 * @param customerKey
 */

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
export const TOSS_WIDGET_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_WIDGET_CLIENT_KEY as string;

export const usePaymentWidget = () => {
  const { data: paymentWidget } = useQuery({
    queryKey: ['payment-widget', TOSS_WIDGET_CLIENT_KEY, ANONYMOUS],
    queryFn: () => {
      return loadPaymentWidget(TOSS_WIDGET_CLIENT_KEY, ANONYMOUS);
    },
  });

  const handlePaymentRequest = async (orderList: Tables<'menu_item'>[]) => {
    // 결제를 요청하기 전에 orderId, amount를 서버(토스)에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: orderList.length > 1 ? `${orderList[0].name} 외 ${orderList.length - 1}개` : `${orderList[0].name}`,
        successUrl: `${window.location.origin}/order/success`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  return { paymentWidget, handlePaymentRequest };
};
