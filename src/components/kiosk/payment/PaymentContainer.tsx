import React, { useEffect, useRef } from 'react';
import styles from './styles/PaymentContainer.module.css';
import useOrderState, { getTotalPrice, ORDER_STEP } from '@/shared/store/order';
import { usePaymentWidget } from '@/hooks/order/usePaymentWidget';
import MenuHeader from '@/components/kiosk/common/MenuHeader';

/**
 * STEP4: 토스 결제 화면
 * @constructor
 */
const PaymentContainer = () => {
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget>();
  const { paymentWidget } = usePaymentWidget();
  const orderList = useOrderState(state => state.orderList);
  const step = useOrderState(state => state.step);

  useEffect(() => {
    if (paymentWidget == null || step !== ORDER_STEP.PAYMENT) {
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
  }, [paymentWidget, step]);

  return (
    <div className={styles.container}>
      <MenuHeader />
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div className={styles.tossContainer}>
        <div id="payment-widget" />
        <div id="agreement" />
      </div>
    </div>
  );
};

export default PaymentContainer;
