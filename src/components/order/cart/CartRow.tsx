import React from 'react';
import styles from './styles/CartRow.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';
import useOrderStore from '@/shared/store/order';

const CartRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const { addOrderList, subtractOrderList, getOptionPriceByList } = useOrderStore();

  const handleClickUpQuantity = (item: MenuItemWithOption) => {
    addOrderList([item]);
  };

  const handleClickDownQuantity = (item: MenuItemWithOption) => {
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
        <span>
          {convertNumberToWon(
            itemList.reduce((acc, cur) => acc + cur.price, 0) +
              getOptionPriceByList(itemList.map(item => item.menu_option).flat()),
          )}
        </span>
      </div>
    </div>
  );
};

export default CartRow;
