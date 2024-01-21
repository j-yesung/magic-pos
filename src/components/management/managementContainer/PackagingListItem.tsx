import useManagementStore from '@/shared/store/management';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import styles from './styles/PackagingListItem.module.css';

const PackagingListItem = ({ packagingData }: { packagingData: Tables<'order_number'> }) => {
  const { setIsSideBar, setOrderId } = useManagementStore();
  const { menu_list } = packagingData;
  const menuList: Tables<'menu_item'>[] = JSON.parse(JSON.stringify(menu_list));

  const clickOrderDataReFetchHandler = () => {
    setOrderId({ id: [packagingData.id], status: '포장', number: '' });
    setIsSideBar();
  };

  return (
    <div className={styles['packaging-list-item']} onClick={clickOrderDataReFetchHandler}>
      <div className={styles['item-order-number']}>{packagingData.order_number}</div>
      <div className={styles['item-menu-list']}>
        {menuList.map(item => (
          <span key={item.id}>
            {item.name}&nbsp;&nbsp;
            {item.remain_ea}
          </span>
        ))}
      </div>
      <div className={styles['item-time']}>{moment(packagingData.order_time).format('HH:mm')}</div>
    </div>
  );
};

export default PackagingListItem;
