import { useQuery } from '@tanstack/react-query';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';

/**
 * toss widget을 렌더링 하기 위한 비동기 함수를 호출한다.
 * @param clientKey
 * @param customerKey
 */
export const usePaymentWidget = (clientKey: string, customerKey: string) => {
  return useQuery({
    queryKey: ['payment-widget', clientKey, customerKey],
    queryFn: () => {
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
};
