import React from 'react';
import styles from '@/components/layout/order/styles/OrderLayout.module.css';
import useOrderStore, { ORDER_STEP } from '@/shared/store/order';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';

const OrderPrevButton = () => {
  const goPrevStep = useOrderStore(state => state.goPrevStep);
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);
  const setSelectedMenu = useOrderStore(state => state.setSelectedMenu);
  const resetSelectedOptions = useOrderStore(state => state.resetSelectedOptions);
  const swiperRef = useOrderStore(state => state.swiperRef);

  const clickPrevButtonHandler = () => {
    if (optionSwiperRef?.current?.swiper?.activeIndex === ORDER_STEP.SELECT_MENU) {
      optionSwiperRef.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
      setSelectedMenu(null);
      resetSelectedOptions();
    } else {
      swiperRef!.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
      goPrevStep();
    }
  };

  return (
    <button className={styles.prevButton} onClick={clickPrevButtonHandler}>
      ←
    </button>
  );
};

export default OrderPrevButton;
