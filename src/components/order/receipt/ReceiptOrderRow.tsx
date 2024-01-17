import React from 'react';
import styles from './styles/ReceiptOrderRow.module.css';
import Image from 'next/image';
import clsx from 'clsx';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon, groupByKey } from '@/shared/helper';
import CartOptionRow from '@/components/order/cart/CartOptionRow';
import { getOptionPriceByList } from '@/shared/store/order';

const ReceiptOrderRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const group = groupByKey<MenuItemWithOption>(itemList, 'unique');

  return (
    <>
      {[...group].map(([key, value]) => (
        <div key={key} className={styles.container}>
          <Image src={value[0].image_url ?? ''} alt={value[0].name ?? ''} width={100} height={100}></Image>
          <div className={styles.info}>
            <div className={clsx(styles.info, styles.gap10)}>
              <span className={styles.productName}>{value[0].name}</span>
              <CartOptionRow menu={value} />
            </div>
            <span className={styles.productPrice}>
              {convertNumberToWon(
                value.reduce((acc, cur) => acc + cur.price, 0) +
                  getOptionPriceByList(value.map(item => item.menu_option).flat()),
              )}
            </span>
          </div>
          <div className={styles.productEa}>{value.length}</div>
        </div>
      ))}
    </>
  );
};

export default ReceiptOrderRow;