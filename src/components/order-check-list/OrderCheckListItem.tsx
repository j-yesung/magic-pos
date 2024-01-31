import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, StoreOrderWithStoreName, Tables } from '@/types/supabase';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './styles/OrderCheckListItem.module.css';

const OrderCheckListItem = ({ orderData }: { orderData?: Tables<'order_store'> | Tables<'order_number'> }) => {
  const { is_togo, menu_list, order_number, is_done, order_time } = orderData as StoreOrderWithStoreName;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');

  return (
    <div className={styles['order-check-list-content-item']}>
      <div className={styles['item-number']}>
        <span className={clsx(styles['is-togo'], is_togo ? styles['togo-true'] : styles['togo-false'])}>
          {is_togo ? '포장' : '매장'}
        </span>
        <span>{order_number}</span>
      </div>
      <div className={styles['item-time']}>
        <span>{dayjs(order_time).format('YYYY-MM-DD')}</span>
        <span>{dayjs(order_time).format('HH:mm:ss')}</span>
      </div>
      <div className={styles['item-content']}>
        {[...group].map(([key, menuList]) => {
          return (
            <div key={key}>
              <div className={styles['menu-option']}>
                <div className={styles['menu-title']}>
                  <span>{menuList[0].name}</span>
                  <span>{menuList.length}</span>
                </div>
                {menuList[0].menu_option?.map(option => (
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
      <div
        className={clsx(styles['item-status'], {
          [styles['done-false']]: !is_done,
          [styles['done-true']]: is_done,
        })}
      >
        {is_done ? '주문 완료' : '주문 준비중'}
      </div>
    </div>
  );
};

export default OrderCheckListItem;
