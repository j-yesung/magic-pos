import { Tables } from '@/types/supabase';
import styles from './styles/OrderCheckListItem.module.css';

const OrderCheckListItem = ({ orderData }: { orderData?: Tables<'order_store'> | Tables<'order_number'> }) => {
  const { is_togo, menu_list, order_number, is_done, id, order_time } = orderData;
  const menuList: Tables<'menu_item'>[] = JSON.parse(JSON.stringify(menu_list));

  return (
    <div className={styles['order-check-list-content-item']}>
      <div className={styles['item-number']}>
        {is_togo ? '포장' : '매장'}
        {order_number}
      </div>
      {/* <div className={styles['item-time']}>{moment(order_time).format('YYYY-MM-DD HH:mm')}</div> */}
      <div className={styles['item-time']}>{id}</div>
      <div className={styles['item-content']}>
        {menuList.map(menu => {
          return (
            <span key={menu.id}>
              <span>{menu.name} </span>
              <span>{menu.remain_ea}</span>
              <span>, </span>
            </span>
          );
        })}
      </div>
      <div className={styles['item-status']}>
        <span>{is_done ? '주문 완료' : '메뉴 준비중'}</span>
      </div>
    </div>
  );
};

export default OrderCheckListItem;
