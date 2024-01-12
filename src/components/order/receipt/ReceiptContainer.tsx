import React from 'react';
import styles from './styles/ReceiptContainer.module.css';
import useOrderStore from '@/shared/store/order';
import ReceiptHeader from '@/components/order/receipt/ReceiptHeader';
import ReceiptRow from '@/components/order/receipt/ReceiptRow';
import ReceiptFooter from '@/components/order/receipt/ReceiptFooter';

const ReceiptContainer = () => {
  const { orderList } = useOrderStore();

  console.log(orderList);

  return (
    <div className={styles.container}>
      <div className={styles.rowWrapper}>
        <ReceiptHeader />
        <ReceiptRow />
        <ReceiptRow />
        <ReceiptRow />
        <ReceiptRow />
        <ReceiptRow />
        <ReceiptRow />
        <ReceiptRow />
      </div>
      <ReceiptFooter />
    </div>
  );
};

export default ReceiptContainer;
