import React from 'react';
import styles from './styles/ReceiptOrderRow.module.css';
import Image from 'next/image';
import clsx from 'clsx';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';
import useOrderStore from '@/shared/store/order';
import CartOptionRow from '@/components/order/cart/CartOptionRow';

const ReceiptOrderRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const getOptionPriceByList = useOrderStore(state => state.getOptionPriceByList);

  return (
    <div className={styles.container}>
      <Image src={itemList[0].image_url ?? ''} alt={itemList[0].name ?? ''} width={100} height={100}></Image>
      <div className={styles.info}>
        <div className={clsx(styles.info, styles.gap10)}>
          <span className={styles.productName}>{itemList[0].name}</span>
          <CartOptionRow menu={itemList} />
        </div>
        <span className={styles.productPrice}>
          {convertNumberToWon(
            itemList.reduce((acc, cur) => acc + cur.price, 0) +
              getOptionPriceByList(itemList.map(item => item.menu_option).flat()),
          )}
        </span>
      </div>
      <div className={styles.productEa}>{itemList.length}</div>
    </div>
  );
};

export default ReceiptOrderRow;
