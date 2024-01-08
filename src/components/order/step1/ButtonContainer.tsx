import React from 'react';
import OrderTypeButton from '@/components/order/step1/OrderTypeButton';
import styles from './styles/button-container.module.css';

const ButtonContainer = () => {
  return (
    <div className={styles.container}>
      <div>
        <OrderTypeButton order={{ type: 'togo' }} />
        <OrderTypeButton order={{ type: 'store' }} />
      </div>
    </div>
  );
};

export default ButtonContainer;
