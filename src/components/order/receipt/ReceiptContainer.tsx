import React from 'react';
import styles from './styles/ReceiptContainer.module.css';
import useOrderStore from '@/shared/store/order';

const ReceiptContainer = () => {
  const { orderList } = useOrderStore();

  console.log(orderList);

  return <div className={styles.container}>주문 내역 확인</div>;
};

export default ReceiptContainer;
