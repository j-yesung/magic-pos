import React from 'react';
import OrderTypeCard from '@/components/order/order-type/OrderTypeCard';
import styles from './styles/ButtonContainer.module.css';

const ButtonContainer = () => {
  return (
    <div className={styles.container}>
      <OrderTypeCard order={{ type: 'togo' }} />
      <OrderTypeCard order={{ type: 'store' }} />
    </div>
  );
};

export default ButtonContainer;
