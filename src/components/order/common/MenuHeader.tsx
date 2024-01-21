import React from 'react';
import styles from './style/MenuHeader.module.css';
import useOrderStore, { ORDER_STEP } from '@/shared/store/order';

const TITLE: { [key in number]: string } = {
  [ORDER_STEP.CHECK_MENU]: '장바구니',
  [ORDER_STEP.PAYMENT]: '결제 하기',
  [ORDER_STEP.SUCCESS]: '주문 완료',
};

const MenuHeader = () => {
  const step = useOrderStore(state => state.step);

  return (
    <header className={styles.container}>
      <div>{TITLE[step]}</div>
    </header>
  );
};

export default MenuHeader;
