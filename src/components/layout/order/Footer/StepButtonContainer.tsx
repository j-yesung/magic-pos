import React from 'react';
import StepButton from '@/components/layout/order/Footer/StepButton';
import styles from './styles/step-button-container.module.css';
import useOrderStore from '@/shared/store/order';
import { useSwiper, SwiperRef } from 'swiper/react';

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
    next: '결제 하기',
  },
  3: {
    prev: '담은 메뉴 확인',
  },
};

const StepButtonContainer = ({ step, sliderRef }: StepButtonContainerProps) => {
  const { goNextStep, goPrevStep } = useOrderStore.getState();
  const swiper = useSwiper();

  const prev = BUTTON_OPTIONS[step]?.prev;
  const next = BUTTON_OPTIONS[step]?.next;

  const prevClickHandler = () => {
    sliderRef!.current!.swiper.slidePrev();
    goPrevStep();
  };

  const nextClickHandler = () => {
    sliderRef!.current!.swiper.slideNext();
    goNextStep();
  };

  return (
    <div className={styles.container}>
      {prev && <StepButton text={prev} handler={prevClickHandler} />}
      {next && <StepButton text={next} handler={nextClickHandler} />}
    </div>
  );
};

export default StepButtonContainer;
