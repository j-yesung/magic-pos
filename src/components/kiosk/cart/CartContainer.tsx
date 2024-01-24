import useKioskState from '@/shared/store/kiosk';
import CartRow from '@/components/kiosk/cart/CartRow';
import styles from './styles/CartContainer.module.css';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption } from '@/types/supabase';
import WarningNoOrderList from '@/components/kiosk/cart/WarningNoOrderList';
import StoreInfo from '@/components/kiosk/common/StoreInfo';
import TotalPrice from '@/components/kiosk/common/TotalPrice';
import MenuHeader from '@/components/kiosk/common/MenuHeader';
import CartMoreButton from '@/components/kiosk/cart/CartMoreButton';

/**
 * STEP3: 담은 메뉴 보기
 * @constructor
 */
const CartContainer = () => {
  const orderList = useKioskState(state => state.orderList);
  const orderType = useKioskState(state => state.orderType);
  const storeName = useKioskState(state => state.storeName);

  const group = groupByKey<MenuItemWithOption>(orderList, 'unique');

  return (
    <div className={styles.container}>
      <MenuHeader />
      <section className={styles.cartWrapper}>
        <StoreInfo orderType={orderType} storeName={storeName} className={styles.storeInfo} amount={orderList.length} />
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
  );
};

export default CartContainer;
