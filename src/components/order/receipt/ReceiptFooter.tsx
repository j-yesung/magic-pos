import React from 'react';
import styles from './styles/ReceiptFooter.module.css';
import { Tables } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';

const ReceiptFooter = ({ allItemList }: { allItemList: Tables<'menu_item'>[] }) => {
  return (
    <div className={styles.container}>
      <span>총 결제금액</span>
      <span>{convertNumberToWon(allItemList.reduce((acc, cur) => acc + cur.price, 0))}</span>
    </div>
  );
};

export default ReceiptFooter;
