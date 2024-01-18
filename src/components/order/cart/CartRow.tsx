import React from 'react';
import styles from './styles/CartRow.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';
import { addOrderList, getOptionPriceByList, subtractOrderList } from '@/shared/store/order';
import CartOptionRow from '@/components/order/cart/CartOptionRow';

const CartRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
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
      {itemList[0].menu_option?.length > 0 && (
        <div className={styles.optionWrapper}>
          <CartOptionRow menu={itemList} />
        </div>
      )}
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
