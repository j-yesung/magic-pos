import React from 'react';
import styles from './styles/ReceiptOrderHeader.module.css';

interface ReceiptHeaderProps {
  orderNumber: number;
  orderName: string | null;
  isTogo: boolean;
}

const ReceiptOrderHeader = ({ isTogo, orderName, orderNumber }: ReceiptHeaderProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.orderNumber}>{orderNumber}</span>
      <span className={styles.orderStoreName}>{orderName}</span>
      <div className={styles.orderType}>
        <span>{isTogo ? '포장' : '매장'}</span>
      </div>
    </div>
  );
};

export default ReceiptOrderHeader;
