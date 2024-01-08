import React from 'react';
import { useSwiper } from 'swiper/react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/order-type-button.module.css';

const OrderTypeButton = ({ order }: { order: OrderType }) => {
  const { goNextStep } = useOrderStore.getState();
  const swiper = useSwiper();

  const clickButtonHandler = () => {
    swiper.slideNext();
    goNextStep();
  };

  return (
    <button className={styles.button} onClick={clickButtonHandler}>
      {order.type === 'togo' ? '포장' : '매장'}
    </button>
  );
};

export default OrderTypeButton;
