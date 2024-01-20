import React, { useEffect, useState } from 'react';
import styles from '@/components/layout/order/styles/OrderLayout.module.css';
import useOrderStore, {
  goPrevStep,
  ORDER_STEP,
  resetSelectedOptions,
  setIsOptionPage,
  setSelectedMenu,
} from '@/shared/store/order';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';
import { PiCaretLeft } from 'react-icons/pi';
import clsx from 'clsx';

const OrderPrevButton = () => {
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);
  const swiperRef = useOrderStore(state => state.swiperRef);
  const isOptionPage = useOrderStore(state => state.isOptionPage);

  const clickPrevButtonHandler = () => {
    if (optionSwiperRef?.current?.swiper?.activeIndex === ORDER_STEP.SELECT_MENU) {
      optionSwiperRef.current?.swiper.slidePrev();
      setSelectedMenu(null);
      resetSelectedOptions();
    } else {
      swiperRef!.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
      goPrevStep();
    }
    setIsOptionPage(false);
  };

  return (
    <button
      className={clsx(styles.prevButton, {
        [styles.bgOpacity]: isOptionPage,
      })}
      onClick={clickPrevButtonHandler}
    >
      <PiCaretLeft size={30} />
    </button>
  );
};

export default OrderPrevButton;
