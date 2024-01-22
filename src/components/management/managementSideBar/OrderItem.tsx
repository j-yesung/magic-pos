import useSetManagement from '@/hooks/management/useSetManagement';
import { useModal } from '@/hooks/modal/useModal';
import { MenuItemWithOption, OrderDataWithStoreName } from '@/types/supabase';
import moment from 'moment';
import { IoCheckmark } from 'react-icons/io5';
import styles from './styles/OrderItem.module.css';

const OrderItem = ({ orderData }: { orderData: OrderDataWithStoreName }) => {
  const { id, order_number, order_time, menu_list, total_price, is_togo } = orderData;
  const menuList: MenuItemWithOption[] = JSON.parse(JSON.stringify(menu_list));
  const { MagicModal } = useModal();
  const { mutate } = useSetManagement();

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
        {menuList?.map(item => {
          return (
            <li key={item.id} className={styles['menu-list-item']}>
              {/* <span>
                  <Image src={item.image_url ?? ''} alt="" width="30" height="30" />
                </span> */}
              <div className={styles['menu-name']}>
                <span>{item.name}</span>
                <span>{item.remain_ea}개</span>
              </div>
              <div className={styles['menu-option']}>
                {item.menu_option?.map(option => {
                  return (
                    <span key={option.id}>
                      {option.name}:
                      {option.menu_option_detail.map(detail => {
                        return <span key={detail.id}>{detail.name}</span>;
                      })}
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
        <div>
          <span>총 금액</span>
          <span>{total_price} 원</span>
        </div>
        <button onClick={clickOrderConfirmHandler}>
          <IoCheckmark className={styles['check-icon']} />
          주문완료하기
        </button>
      </div>
    </li>
  );
};

export default OrderItem;
