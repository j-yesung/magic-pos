import React, { useState } from 'react';
import styles from './styles/StepButton.module.css';
import useOrderStore from '@/shared/store/order';
import { MenuItemWithOption } from '@/types/supabase';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';

const AddCartButton = ({ menu }: { menu: MenuItemWithOption | null }) => {
  const [quantity, setQuantity] = useState(1);
  const { addOrderList, optionSwiperRef } = useOrderStore();

  // 수량 증가
  const handleClickUpQuantity = () => {
    setQuantity(prev => ++prev);
  };

  // 수량 감소
  const handleClickDownQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleClickAddCart = () => {
    if (menu) {
      addOrderList(new Array(quantity).fill(false).map(() => menu));
    }
    optionSwiperRef?.current!.swiper.slidePrev(SLIDE_MOVE_SPEED);
  };

  return (
    <button className={styles.button} onClick={handleClickAddCart}>
      담기
    </button>
  );
};

export default AddCartButton;
