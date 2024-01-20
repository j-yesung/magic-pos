import React from 'react';
import styles from '@/components/layout/order/styles/OrderLayout.module.css';
import useOrderStore, { goPrevStep, ORDER_STEP, resetSelectedOptions, setSelectedMenu } from '@/shared/store/order';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FaChevronLeft } from 'react-icons/fa6';
import { BsChevronLeft } from 'react-icons/bs';
import { SlArrowLeft } from 'react-icons/sl';
import { PiCaretLeft } from 'react-icons/pi';

const OrderPrevButton = () => {
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);
  const swiperRef = useOrderStore(state => state.swiperRef);

  const clickPrevButtonHandler = () => {
    if (optionSwiperRef?.current?.swiper?.activeIndex === ORDER_STEP.SELECT_MENU) {
      optionSwiperRef.current?.swiper.slidePrev();
      setSelectedMenu(null);
      resetSelectedOptions();
    } else {
      swiperRef!.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
      goPrevStep();
    }
  };

  return (
    <button className={styles.prevButton} onClick={clickPrevButtonHandler}>
      <PiCaretLeft size={30} />
    </button>
  );
};

export default OrderPrevButton;
