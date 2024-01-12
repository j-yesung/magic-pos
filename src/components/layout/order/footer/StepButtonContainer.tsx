import React from 'react';
import StepButton from '@/components/layout/order/footer/StepButton';
import styles from './styles/StepButtonContainer.module.css';
import useOrderStore, { ORDER_STEP } from '@/shared/store/order';
import { SwiperRef } from 'swiper/react';
import { ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { TOSS_WIDGET_CLIENT_KEY, usePaymentWidget } from '@/hooks/order/usePaymentWidget';

interface StepButtonContainerProps {
  step: number;
  sliderRef: React.RefObject<SwiperRef>;
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

const StepButtonContainer = ({ step, sliderRef }: StepButtonContainerProps) => {
  const { goNextStep, goPrevStep, orderList } = useOrderStore.getState();
  const { paymentWidget, handlePaymentRequest } = usePaymentWidget();

  const prev = BUTTON_OPTIONS[step]?.prev;
  const next = BUTTON_OPTIONS[step]?.next;

  const prevClickHandler = () => {
    sliderRef.current!.swiper.slidePrev();
    goPrevStep();
  };

  const nextClickHandler = async () => {
    if (step === ORDER_STEP.PAYMENT && paymentWidget) {
      await handlePaymentRequest(orderList);
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
