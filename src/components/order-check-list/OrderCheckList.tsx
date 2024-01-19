import useOrderCheckList from '@/hooks/order-check-list/useOrderCheckList';
import useAuthStore from '@/shared/store/auth';
import OrderCheckListItem from './OrderCheckListItem';
import styles from './styles/OrderCheckList.module.css';

const OrderCheckList = () => {
  const { auth } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data } = useOrderCheckList(id);
  const orderData = data && [...data[0].order_number, ...data[0].order_store]
  console.log(orderData)
  return (
    <div className={styles['order-check-list-wrapper']}>
      <div className={styles['order-check-list-title']}>
        <div className={styles['title-number']}>주문번호</div>
        <div className={styles['title-time']}>주문시간</div>
        <div className={styles['title-content']}>주문내용</div>
        <div className={styles['title-status']}>상태</div>
      </div>
      <div className={styles['order-check-list-content-list']}>
        {
          orderData?.map((item) => <OrderCheckListItem key={item.id} orderData={item} />)
        }
      </div>
    </div>
  )
}

export default OrderCheckList