import React from 'react';
import useOrderState from '@/shared/store/order';
import CartRow from '@/components/order/cart/CartRow';
import styles from './styles/CartContainer.module.css';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption } from '@/types/supabase';
import WarningNoOrderList from '@/components/order/cart/WarningNoOrderList';
import StoreInfo from '@/components/order/common/StoreInfo';
import TotalPrice from '@/components/order/common/TotalPrice';
import MenuHeader from '@/components/order/common/MenuHeader';
import CartMoreButton from '@/components/order/cart/CartMoreButton';

/**
 * STEP3: 담은 메뉴 보기
 * @constructor
 */
const CartContainer = () => {
  const orderList = useOrderState(state => state.orderList);
  const orderType = useOrderState(state => state.orderType);
  const storeName = useOrderState(state => state.storeName);

  const group = groupByKey<MenuItemWithOption>(orderList, 'unique');

  return (
    <>
      <div className={styles.container}>
        <MenuHeader />
        <section className={styles.cartWrapper}>
          <StoreInfo
            orderType={orderType}
            storeName={storeName}
            className={styles.storeInfo}
            amount={orderList.length}
          />
          <div className={styles.rowContainer}>
            {group.size === 0 && <WarningNoOrderList />}
            {[...group].map(([key, value]) => (
              <CartRow key={key} itemList={value} />
            ))}
          </div>
          <CartMoreButton />
        </section>
        <TotalPrice itemList={orderList} />
      </div>
    </>
  );
};

export default CartContainer;
