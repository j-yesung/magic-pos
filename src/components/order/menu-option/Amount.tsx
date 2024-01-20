import React, { useEffect } from 'react';
import styles from './styles/Amount.module.css';
import useOrderStore, { addAmount, resetAmount, subtractAmount } from '@/shared/store/order';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const Amount = () => {
  const amount = useOrderStore(state => state.amount);

  useEffect(() => {
    return () => {
      resetAmount();
    };
  }, []);

  return (
    <div className={styles.container}>
      <span>수량</span>
      <div className={styles.buttonWrapper}>
        <button onClick={subtractAmount}>
          <FaMinus size={20} />
        </button>
        <span>{amount}</span>
        <button onClick={addAmount}>
          <FaPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Amount;
