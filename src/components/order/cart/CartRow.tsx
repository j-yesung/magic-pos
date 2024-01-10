import React from 'react';
import styles from './styles/CartRow.module.css';
import { Tables } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';
import useOrderStore from '@/shared/store/order';

const CartRow = ({ itemList }: { itemList: Tables<'menu_item'>[] }) => {
  const { addOrderList, subtractOrderList } = useOrderStore();

  const handleClickUpQuantity = (item: Tables<'menu_item'>) => {
    addOrderList([item]);
  };

  const handleClickDownQuantity = (item: Tables<'menu_item'>) => {
    subtractOrderList(item);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuName}>
        <span>{itemList[0].name}</span>
        <div>
          수량: <button onClick={handleClickDownQuantity.bind(null, itemList[0])}>-</button>
          <span className={styles.quantity}>{itemList.length}</span>
          <button onClick={handleClickUpQuantity.bind(null, itemList[0])}>+</button>
        </div>
      </div>
      <div>
        <span>{convertNumberToWon(itemList.reduce((acc, cur) => acc + cur.price, 0))}</span>
      </div>
    </div>
  );
};

export default CartRow;
