import React from 'react';
import styles from './style/TotalPrice.module.css';
import { convertNumberToWon } from '@/shared/helper';
import { Tables } from '@/types/supabase';

const TotalPrice = ({ allItemList }: { allItemList: Tables<'menu_item'>[] }) => {
  return (
    <div className={styles.container}>
      <span>총 결제금액</span>
      <span className={styles.totalPrice}>
        {convertNumberToWon(allItemList.reduce((acc, cur) => acc + cur.price, 0))}
      </span>
    </div>
  );
};

export default TotalPrice;
