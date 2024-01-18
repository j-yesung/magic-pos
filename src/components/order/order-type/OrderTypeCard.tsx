import React from 'react';
import { useSwiper } from 'swiper/react';
import { goNextStep, setOrderType } from '@/shared/store/order';
import styles from './styles/OrderTypeButton.module.css';
import Image from 'next/image';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';

const OrderTypeCard = ({ order }: { order: OrderType }) => {
  const swiper = useSwiper();

  const clickButtonHandler = () => {
    setOrderType(order);
    goNextStep();
    swiper.slideNext(SLIDE_MOVE_SPEED);
  };

  return (
    <div className={styles.wrapper} onClick={clickButtonHandler}>
      <div>
        <Image src={'/images/image-success.png'} alt={'test'} width={100} height={100} />
      </div>
      <span>{order.type === 'togo' ? '포장' : '매장'}</span>
    </div>
  );
};

export default OrderTypeCard;
