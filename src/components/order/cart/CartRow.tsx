import React from 'react';
import styles from './styles/CartRow.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';
import { addOrderList, getOptionPriceByList, subtractOrderList } from '@/shared/store/order';
import Image from 'next/image';
import CartOptionRow from '@/components/order/cart/CartOptionRow';

const CartRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const handleClickUpQuantity = (item: MenuItemWithOption) => {
    addOrderList([item]);
  };

  const handleClickDownQuantity = (item: MenuItemWithOption) => {
    subtractOrderList(item.id);
  };

  return (
    <div className={styles.container}>
      <Image src={itemList[0].image_url ?? ''} alt={itemList[0].name ?? ''} width={100} height={100} />
      <div className={styles.menuInfo}>
        <div className={styles.menuNameOption}>
          <div>
            <h2>{itemList[0].name}</h2>
            {itemList[0].menu_option?.length > 0 && <CartOptionRow menu={itemList} />}
          </div>
          <span>
            {convertNumberToWon(
              itemList.reduce((acc, cur) => acc + cur.price, 0) +
                getOptionPriceByList(itemList.map(item => item.menu_option).flat()),
            )}
          </span>
        </div>
      </div>
      {/*<div className={styles.menuName}>*/}
      {/*  <span>{itemList[0].name}</span>*/}
      {/*  <div>*/}
      {/*    수량: <button onClick={handleClickDownQuantity.bind(null, itemList[0])}>-</button>*/}
      {/*    <span className={styles.quantity}>{itemList.length}</span>*/}
      {/*    <button onClick={handleClickUpQuantity.bind(null, itemList[0])}>+</button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div></div>
    </div>
  );
};

export default CartRow;
