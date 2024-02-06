import useManagementClickHandler from '@/hooks/service/management/useManagementClickHandler';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import styles from './styles/ShopIsNotTableListItem.module.css';

const ShopIsNotTableListItem = ({ shopData }: { shopData: Tables<'order_number'> }) => {
  const { menu_list } = shopData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const { clickShopIsNotTableOrderDataHandler } = useManagementClickHandler();
  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');

  return (
    <div
      className={styles['shop-list-item']}
      onClick={() => {
        clickShopIsNotTableOrderDataHandler(shopData.id);
      }}
    >
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
