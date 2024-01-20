import React from 'react';
import styles from './style/StoreInfo.module.css';

interface StoreInfoProps {
  orderType: OrderType;
  storeName: string;
}

const StoreInfo = ({ orderType, storeName }: StoreInfoProps) => {
  return (
    <div className={styles.storeInfo}>
      <div className={styles.wrapper}>
        <div className={styles.orderType}>
          <span>{orderType.type === 'togo' ? '포장' : '매장'}</span>
        </div>
        <span className={styles.storeName}>{storeName}</span>
      </div>
    </div>
  );
};

export default StoreInfo;
