import React from 'react';
import { MenuItemWithOption } from '@/types/supabase';
import styles from './styles/CartOptionRow.module.css';

const CartOptionRow = ({ menu }: { menu: MenuItemWithOption[] }) => {
  return (
    <span className={styles.optionText}>
      {menu[0].menu_option
        .map(option => option.menu_option_detail)
        .flat()
        .map(detail => {
          let text = detail.name;
          if (detail.price > 0) text += `(+${detail.price})`;
          return text;
        })
        .join(' / ')}
    </span>
  );
};

export default CartOptionRow;
