import useManagementClickHandler from '@/hooks/service/management/useManagementClickHandler';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import styles from './styles/PackagingListItem.module.css';

const PackagingListItem = ({ packagingData }: { packagingData: Tables<'order_number'> }) => {
  const { menu_list } = packagingData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const { clickPackagingOrderDataHandler } = useManagementClickHandler();
  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');

  return (
    <div
      className={styles['packaging-list-item']}
      onClick={() => {
        clickPackagingOrderDataHandler(packagingData.id);
      }}
    >
      <div className={styles['item-order-number']}>{packagingData.order_number}</div>
      <div className={styles['item-menu-list']}>
        {[...group].map(([key, item]) => (
          <div key={key}>
            <span className={styles['item-name']}>{item[0].name}</span>
            <span>{item.length}</span>
          </div>
        ))}
      </div>
      <div className={styles['item-time']}>{dayjs(packagingData.order_time).format('HH:mm')}</div>
    </div>
  );
};

export default PackagingListItem;
