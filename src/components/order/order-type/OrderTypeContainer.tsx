import React from 'react';
import ButtonContainer from '@/components/order/order-type/ButtonContainer';
import styles from './styles/step-one-container.module.css';

/**
 * 포장 / 매장 선택
 * @constructor
 */
const OrderTypeContainer = () => {
  return (
    <div className={styles.container}>
      <h1>포장 하시나요 드시고 가시나요?</h1>
      <ButtonContainer />
    </div>
  );
};

export default OrderTypeContainer;
