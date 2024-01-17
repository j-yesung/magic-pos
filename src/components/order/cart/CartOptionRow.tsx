import React from 'react';
import { MenuItemWithOption } from '@/types/supabase';
import CartOptionDetailRow from '@/components/order/cart/CartOptionDetailRow';
import styles from './styles/CartOptionRow.module.css';

const CartOptionRow = ({ menu }: { menu: MenuItemWithOption[] }) => {
  return (
    <>
      {menu[0].menu_option.map(option => (
        <div key={option.id} className={styles.container}>
          <span className={styles.optionName}>{option.name}</span>
          <CartOptionDetailRow details={option.menu_option_detail} />
        </div>
      ))}
    </>
  );
};

export default CartOptionRow;
