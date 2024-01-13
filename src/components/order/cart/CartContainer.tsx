import React from 'react';
import useOrderStore from '@/shared/store/order';
import CartRow from '@/components/order/cart/CartRow';
import styles from './styles/CartContainer.module.css';
import { groupByKey } from '@/shared/helper';
import MessageBox from '@/components/order/cart/MessageBox';
import { Tables } from '@/types/supabase';
import WarningNoOrderList from '@/components/order/cart/WarningNoOrderList';
import StoreInfo from '@/components/order/common/StoreInfo';
import TotalPrice from '@/components/order/common/TotalPrice';
import ReceiptHeader from '@/components/order/receipt/ReceiptHeader';

/**
 * STEP3: 담은 메뉴 보기
 * @constructor
 */
const CartContainer = () => {
  const { orderList, orderType } = useOrderStore();

  const group = groupByKey<Tables<'menu_item'>>(orderList, 'id');

  return (
    <div className={styles.container}>
      <StoreInfo orderType={orderType} storeName={'어쩌구 카페'} />
      <div className={styles.rowContainer}>
        {group.size === 0 && <WarningNoOrderList />}
        {[...group].map(([key, value]) => (
          <CartRow key={key} itemList={value} />
        ))}
      </div>
      <TotalPrice allItemList={orderList} />
    </div>
  );
};

export default CartContainer;
