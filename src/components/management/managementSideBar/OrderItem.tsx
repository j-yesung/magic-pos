import LoadingSpinner from '@/components/common/LoadingSpinner';
import useSetManagement from '@/hooks/management/useSetManagement';
import { useModal } from '@/hooks/service/ui/useModal';
import { groupByKey } from '@/shared/helper';
import { MenuItemWithOption, OrderDataWithStoreName } from '@/types/supabase';
import moment from 'moment';
import { IoCheckmark } from 'react-icons/io5';
import styles from './styles/OrderItem.module.css';

const OrderItem = ({ orderData }: { orderData: OrderDataWithStoreName }) => {
  const { id, order_number, order_time, menu_list, total_price, is_togo } = orderData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const { MagicModal } = useModal();
  const { mutate, isPending } = useSetManagement();

  const group = groupByKey<MenuItemWithOption>(menuList, 'unique');

  const clickOrderConfirmHandler = () => {
    MagicModal.confirm({
      content: '주문을 완료할까요?',
      confirmButtonCallback: () => {
        if (typeof is_togo === 'undefined') {
          mutate({ id: id, isTogo: false });
        } else if (typeof is_togo === 'boolean') {
          mutate({ id: id, isTogo: true });
        }
      },
    });
  };

  return (
    <li className={styles['order-list-item']}>
      <div className={styles['item-title']}>
        <span className={styles['order-number']}>주문 번호 {order_number}</span>
        <span className={styles['order-time']}>{moment(order_time).format('HH:mm')}</span>
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
              {/* <div>
                <span>{convertNumberToWon(item.price)}</span>
              </div> */}
            </li>
          );
        })}
      </ul>
      <div className={styles['menu-button-box']}>
        {/*<div>*/}
        {/*  <span>총 금액</span>*/}
        {/*  <span>{total_price} 원</span>*/}
        {/*</div>*/}
        <button onClick={clickOrderConfirmHandler}>
          {isPending ? (
            <LoadingSpinner boxSize={2} ballSize={0.4} interval={1.5} />
          ) : (
            <>
              <IoCheckmark className={styles['check-icon']} />
              <span>주문완료하기</span>
            </>
          )}
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
