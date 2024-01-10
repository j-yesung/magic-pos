import React from 'react';
import styles from './styles/CartRow.module.css';
import { Tables } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';

const CartRow = ({ itemList }: { itemList: Tables<'menu_item'>[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menuName}>
        <span>{itemList[0].name}</span>
        <div>
          수량: <button>-</button>
          <span className={styles.quantity}>{itemList.length}</span>
          <button>+</button>
        </div>
      </div>
      <div>
        <span>{convertNumberToWon(itemList.reduce((acc, cur) => acc + cur.price, 0))}</span>
      </div>
    </div>
  );
};

export default CartRow;
