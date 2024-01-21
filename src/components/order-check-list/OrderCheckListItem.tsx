import { MenuItemWithOption, StoreOrderWithStoreName, Tables } from '@/types/supabase';
import clsx from 'clsx';
import moment from 'moment';
import styles from './styles/OrderCheckListItem.module.css';

const OrderCheckListItem = ({ orderData }: { orderData?: Tables<'order_store'> | Tables<'order_number'> }) => {
  const { is_togo, menu_list, order_number, is_done, order_time } = orderData as StoreOrderWithStoreName;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  return (
    <div className={styles['order-check-list-content-item']}>
      <div className={styles['item-number']}>
        <span className={clsx(styles['is-togo'], is_togo ? styles['togo-true'] : styles['togo-false'])}>
          {is_togo ? '포장' : '매장'}
        </span>
        <span>{order_number}</span>
      </div>
      <div className={styles['item-time']}>
        <span>{moment(order_time).format('YYYY-MM-DD')}</span>
        <span>{moment(order_time).format('HH:mm:ss')}</span>
      </div>
      <div className={styles['item-content']}>
        {menuList.map(menu => {
          return (
            <div key={menu.id}>
              <div className={styles['menu-title']}>
                <span>
                  {menu.name}&nbsp;&nbsp;
                  {menu.remain_ea}
                </span>
              </div>
              <div className={styles['menu-option']}>
                {menu.menu_option?.map(option => (
                  <div key={option.id}>
                    <span>- {option.name}: </span>
                    {option.menu_option_detail.map(optionDetail => (
                      <span key={optionDetail.id}>{optionDetail.name}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles['item-status']}>
        <span className={clsx(is_done ? styles['done-true'] : styles['done-false'])}>
          {is_done ? '주문 완료' : '주문 준비중'}
        </span>
      </div>
    </div>
  );
};

export default OrderCheckListItem;
