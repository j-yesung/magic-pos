import React from 'react';
import useOrderStore from '@/shared/store/order';
import CartRow from '@/components/order/cart/CartRow';
import styles from './styles/CartContainer.module.css';
import { groupByKey } from '@/shared/helper';
import MessageBox from '@/components/order/cart/MessageBox';
import { Tables } from '@/types/supabase';

const CartContainer = () => {
  const { orderList } = useOrderStore();

  const group = groupByKey<Tables<'menu_item'>>(orderList, 'id');

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        {[...group].map(([key, value]) => (
          <CartRow key={key} itemList={value} />
        ))}
      </div>
      <div className={styles.priceContainer}>
        <MessageBox />
      </div>
    </div>
  );
};

export default CartContainer;
