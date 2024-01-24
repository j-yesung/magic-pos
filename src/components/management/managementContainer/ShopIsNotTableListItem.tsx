import { groupByKey } from '@/shared/helper';
import useManagementStore from '@/shared/store/management';
import { MenuItemWithOption, Tables } from '@/types/supabase';
import moment from 'moment';
import styles from './styles/ShopisNotTableListItem.module.css';

const PackagingListItem = ({ packagingData }: { packagingData: Tables<'order_number'> }) => {
  const { setIsSideBar, setOrderId } = useManagementStore();
  const { menu_list } = packagingData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));

  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');

  const clickOrderDataReFetchHandler = () => {
    setOrderId({ id: [packagingData.id], status: '포장', number: '' });
    setIsSideBar();
  };

  return (
    <div className={styles['shop-list-item']} onClick={clickOrderDataReFetchHandler}>
      <div className={styles['item-order-number']}>{packagingData.order_number}</div>
      <div className={styles['item-menu-list']}>
        {[...group].map(([key, item]) => (
          <div key={key}>
            <span className={styles['item-name']}>{item[0].name}</span>
            <span>{item.length}</span>
          </div>
        ))}
      </div>
      <div className={styles['item-time']}>{moment(packagingData.order_time).format('HH:mm')}</div>
    </div>
  );
};

export default PackagingListItem;
