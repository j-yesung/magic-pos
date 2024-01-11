import React from 'react';
import { useSwiper } from 'swiper/react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/OrderTypeButton.module.css';

const OrderTypeButton = ({ order }: { order: OrderType }) => {
  const { goNextStep, setOrderType } = useOrderStore.getState();
  const swiper = useSwiper();

  const clickButtonHandler = () => {
    setOrderType(order);
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
