import React from 'react';
import styles from './styles/ReceiptRow.module.css';
import Image from 'next/image';
import clsx from 'clsx';
import { Tables } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';

const ReceiptRow = ({ itemList }: { itemList: Tables<'menu_item'>[] }) => {
  return (
    <div className={styles.container}>
      <Image src={itemList[0].image_url ?? ''} alt={itemList[0].name ?? ''} width={100} height={100}></Image>
      <div className={styles.info}>
        <div className={clsx(styles.info, styles.gap10)}>
          <span className={styles.productName}>{itemList[0].name}</span>
          <span className={styles.productOption}>옵션</span>
        </div>
        <span className={styles.productPrice}>{convertNumberToWon(itemList[0].price)}</span>
      </div>
      <div className={styles.productEa}>{itemList.length}</div>
    </div>
  );
};

export default ReceiptRow;
