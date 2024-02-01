import { groupByKey } from '@/shared/helper';
import useManagementStore from '@/shared/store/management';
import { MenuItemWithOption, Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import styles from './styles/ShopIsNotTableListItem.module.css';

const ShopIsNotTableListItem = ({ shopData }: { shopData: Tables<'order_number'> }) => {
  const { setIsSideBar, setOrderId } = useManagementStore();
  const { menu_list } = shopData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));

  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');

  const clickOrderDataReFetchHandler = () => {
    setOrderId({ id: [shopData.id], status: '매장', number: '' });
    setIsSideBar();
  };

  return (
    <div className={styles['shop-list-item']} onClick={clickOrderDataReFetchHandler}>
      <div className={styles['item-order-number']}>{shopData.order_number}</div>
      <div className={styles['item-menu-list']}>
        {[...group].map(([key, item]) => (
          <div key={key}>
            <span className={styles['item-name']}>{item[0].name}</span>
            <span>{item.length}</span>
          </div>
        ))}
      </div>
      <div className={styles['item-time']}>{dayjs(shopData.order_time).format('HH:mm')}</div>
    </div>
  );
};

export default ShopIsNotTableListItem;
