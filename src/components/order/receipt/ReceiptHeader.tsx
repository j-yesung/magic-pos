import React from 'react';
import styles from './styles/ReceiptHeader.module.css';

interface ReceiptHeaderProps {
  orderNumber: number;
  orderName: string;
  orderType: OrderType;
}

const ReceiptHeader = ({ orderType, orderName, orderNumber }: ReceiptHeaderProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.orderNumber}>{orderNumber}</span>
      <span className={styles.orderStoreName}>{orderName}</span>
      <div className={styles.orderType}>
        <span>{orderType.type === 'togo' ? '포장' : '매장'}</span>
      </div>
    </div>
  );
};

export default ReceiptHeader;
