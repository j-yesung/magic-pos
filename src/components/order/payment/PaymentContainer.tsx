import React, { useEffect, useRef } from 'react';
import styles from './styles/PaymentContainer.module.css';
import useOrderStore from '@/shared/store/order';
import { usePaymentWidget } from '@/hooks/order/usePaymentWidget';

/**
 * STEP4: 토스 결제 화면
 * @constructor
 */
const PaymentContainer = () => {
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget>();
  const { paymentWidget } = usePaymentWidget();
  const { getTotalPrice, orderList } = useOrderStore.getState();

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // 결제위젯 렌더링
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    paymentMethodsWidgetRef.current = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: getTotalPrice(orderList) },
      { variantKey: 'DEFAULT' },
    );

    // 이용약관 렌더링
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement('#agreement', {
      variantKey: 'AGREEMENT',
    });
  }, [paymentWidget]);

  return (
    <div className={styles.container}>
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div id="payment-widget" />
      <div id="agreement" />
      {/*  결제 버튼은 StepButtonContainer.tsx에 */}
    </div>
  );
};

export default PaymentContainer;
