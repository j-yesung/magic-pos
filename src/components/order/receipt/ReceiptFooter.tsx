import React from 'react';
import styles from './styles/ReceiptFooter.module.css';

const ReceiptFooter = () => {
  return (
    <div className={styles.container}>
      <span>총 결제금액</span>
      <span>150,000원</span>
    </div>
  );
};

export default ReceiptFooter;
