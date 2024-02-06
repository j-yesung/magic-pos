import LoadingSpinner from '@/components/common/LoadingSpinner';
import useSetManagement from '@/hooks/query/management/useSetManagement';
import { useUserTokenFetchQuery } from '@/hooks/query/user-token/useUserTokenFetchQuery';
import useManagementClickHandler from '@/hooks/service/management/useManagementClickHandler';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, OrderDataWithStoreName } from '@/types/supabase';
import dayjs from 'dayjs';
import { IoCheckmark } from 'react-icons/io5';
import styles from './styles/OrderItem.module.css';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

const OrderItem = ({ orderData }: { orderData: OrderDataWithStoreName }) => {
  const { order_number, order_id, order_time, menu_list } = orderData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const { isPending } = useSetManagement();
  const { userToken } = useUserTokenFetchQuery(order_id);
  const { clickOrderConfirmHandler } = useManagementClickHandler();

  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');
  const menuName = [...group]?.[0][1].map(item => item.name).join('');
  const otherMenuNum = [...group]?.[0].length - 1;

  return (
    <li className={styles['order-list-item']}>
      <div className={styles['item-title']}>
        <span className={styles['order-number']}>주문 번호 {order_number}</span>
        <span className={styles['order-time']}>{dayjs(order_time).format('HH:mm')}</span>
      </div>
      <ul className={styles['menu-list']}>
        {[...group]?.map(([key, item]) => {
          return (
            <li key={key} className={styles['menu-list-item']}>
              <div className={styles['menu-name']}>
                <span>{item[0].name}</span>
                <span>{item.length}</span>
              </div>
              <div className={styles['menu-option']}>
                {item?.map(option => {
                  return (
                    <span key={option.id}>
                      {option.menu_option?.[0]?.menu_option_detail.map(detail => detail.name).join('/')}
                    </span>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles['menu-button-box']}>
        <button
          onClick={() => {
            clickOrderConfirmHandler(
              <ExclamationMark width={50} height={50} />,
              menuName,
              otherMenuNum,
              orderData,
              userToken,
            );
          }}
        >
          {isPending ? (
            <LoadingSpinner boxSize={2} ballSize={0.4} interval={1.5} />
          ) : (
            <>
              <IoCheckmark />
              <span>주문완료하기</span>
            </>
          )}
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
