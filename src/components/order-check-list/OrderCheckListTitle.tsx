import React from 'react';
import styles from './styles/OrderCheckListTitle.module.css';

const OrderCheckListTitle = () => {
  return (
    <div className={styles['order-check-list-title']}>
      <div className={styles['title-number']}>주문번호</div>
      <div className={styles['title-time']}>주문시간</div>
      <div className={styles['title-content']}>주문내용</div>
      <div className={styles['title-status']}>상태</div>
    </div>
  );
};

export default OrderCheckListTitle;
