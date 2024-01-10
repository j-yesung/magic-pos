import React from 'react';
import StepButton from '@/components/layout/order/Footer/StepButton';
import styles from './styles/step-button-container.module.css';
import useOrderStore from '@/shared/store/order';
import { SwiperRef } from 'swiper/react';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';

interface StepButtonContainerProps {
  step: number;
  sliderRef: React.RefObject<SwiperRef>;
  paymentWidget: PaymentWidgetInstance | undefined;
}

const BUTTON_OPTIONS: { [key: number]: { prev: string; next?: string } } = {
  1: {
    prev: '포장 / 매장 선택',
    next: '담은 메뉴 확인',
  },
  2: {
    prev: '메뉴 선택',
    next: '결제 화면',
  },
  3: {
    prev: '담은 메뉴 확인',
    next: '결제 하기',
  },
};

const StepButtonContainer = ({ step, sliderRef, paymentWidget }: StepButtonContainerProps) => {
  const { goNextStep, goPrevStep, orderList } = useOrderStore.getState();

  const prev = BUTTON_OPTIONS[step]?.prev;
  const next = BUTTON_OPTIONS[step]?.next;

  const prevClickHandler = () => {
    sliderRef.current!.swiper.slidePrev();
    goPrevStep();
  };

  const nextClickHandler = async () => {
    if (step === 3 && paymentWidget) {
      const handlePaymentRequest = async () => {
        // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        try {
          await paymentWidget?.requestPayment({
            orderId: nanoid(),
            orderName:
              orderList.length > 1 ? `${orderList[0].name} 외 ${orderList.length - 1}개` : `${orderList[0].name}`,
            successUrl: `${window.location.origin}/order/success`,
            failUrl: `${window.location.origin}/order/fail`,
          });
        } catch (error) {
          console.error('Error requesting payment:', error);
        }
      };

      await handlePaymentRequest();
    } else {
      sliderRef.current!.swiper.slideNext();
      goNextStep();
    }
  };

  return (
    <div className={styles.container}>
      {prev && <StepButton text={prev} handler={prevClickHandler} />}
      {next && <StepButton text={next} handler={nextClickHandler} disabled={orderList.length === 0} />}
    </div>
  );
};

export default StepButtonContainer;
