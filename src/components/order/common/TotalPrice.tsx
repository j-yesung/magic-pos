import React from 'react';
import styles from './style/TotalPrice.module.css';
import { convertNumberToWon } from '@/shared/helper';
import { Tables } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';

const TotalPrice = ({ itemList, isAll }: { itemList: Tables<'menu_item'>[]; isAll: boolean }) => {
  const { selectedOptions, getTotalPrice } = useOrderStore();

  const optionPrice = selectedOptions
    .map(option =>
      option.menu_option_detail.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0),
    )
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div className={styles.container}>
      <span>총 결제금액</span>
      <span className={styles.totalPrice}>
        {isAll && convertNumberToWon(getTotalPrice())}
        {!isAll && convertNumberToWon(itemList.reduce((acc, cur) => acc + cur.price, 0) + optionPrice)}
      </span>
    </div>
  );
};

export default TotalPrice;
