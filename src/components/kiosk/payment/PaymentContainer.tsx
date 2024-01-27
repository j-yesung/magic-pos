import { useEffect, useRef } from 'react';
import styles from './styles/PaymentContainer.module.css';
import useKioskState, { getTotalPrice, ORDER_STEP, setIsWidgetRendering } from '@/shared/store/kiosk';
import { usePaymentWidget } from '@/hooks/query/order/usePaymentWidget';
import MenuHeader from '@/components/kiosk/common/MenuHeader';

/**
 * STEP4: 토스 결제 화면
 * @constructor
 */
const PaymentContainer = () => {
  const paymentMethodsWidgetRef = useRef<PaymentMethodsWidget>();
  const { paymentWidget } = usePaymentWidget();
  const orderList = useKioskState(state => state.orderList);
  const step = useKioskState(state => state.step);
  const paymentWidgetDivRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const div = document.querySelector('#payment-widget');

    // toss widget 렌더링 결과를 감지한다..
    const observer = new MutationObserver(e => {
      // e.length === 1 이되면 토스 위젯이 화면에 렌더링이 완료된 것이다.
      setIsWidgetRendering(e.length !== 1);
    });
    observer.observe(div!, { attributes: true, childList: true, subtree: true });
    return () => {
      setIsWidgetRendering(true);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <MenuHeader />
      {/* 결제 UI, 이용약관 UI 영역 */}
      <div className={styles.tossContainer}>
        <div id="payment-widget" ref={paymentWidgetDivRef} />
        <div id="agreement" />
      </div>
    </div>
  );
};

export default PaymentContainer;
