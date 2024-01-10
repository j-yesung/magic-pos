import React from 'react';
import styles from './styles/MessageBox.module.css';
import { convertNumberToWon } from '@/shared/helper';
import useOrderStore from '@/shared/store/order';

const MessageBox = () => {
  const { orderList, getTotalPrice } = useOrderStore();

  return (
    <div className={styles.messageBox}>
      {orderList.length > 0 && (
        <>
          <span>
            {orderList[0].name} {orderList.length > 1 && `외 ${orderList.length - 1}개`}
          </span>
          <span>{convertNumberToWon(getTotalPrice())}</span>
        </>
      )}
    </div>
  );
};

export default MessageBox;
