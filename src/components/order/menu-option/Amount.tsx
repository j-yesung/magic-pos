import React, { useEffect } from 'react';
import styles from './styles/Amount.module.css';
import useOrderStore from '@/shared/store/order';

const Amount = () => {
  const { addAmount, subtractAmount, amount, resetAmount } = useOrderStore();

  useEffect(() => {
    return () => {
      resetAmount();
    };
  }, []);

  return (
    <div className={styles.container}>
      <span>수량</span>
      <div>
        <button onClick={subtractAmount}>-</button>
        <span>{amount}</span>
        <button onClick={addAmount}>+</button>
      </div>
    </div>
  );
};

export default Amount;
