import React from 'react';
import styles from './styles/ReceiptHeader.module.css';

const ReceiptHeader = () => {
  return (
    <div className={styles.container}>
      <span className={styles.orderNumber}>1150</span>
      <span className={styles.orderStoreName}>어쩌구 카페 목동점</span>
      <div className={styles.orderType}>
        <span>포장</span>
      </div>
    </div>
  );
};

export default ReceiptHeader;
