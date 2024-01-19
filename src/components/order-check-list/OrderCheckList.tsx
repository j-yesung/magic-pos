import useOrderCheckList from '@/hooks/order-check-list/useOrderCheckList';
import useAuthStore from '@/shared/store/auth';
import OrderCheckListContentList from './OrderCheckListContentList';
import OrderCheckListTitle from './OrderCheckListTitle';
import styles from './styles/OrderCheckList.module.css';

const OrderCheckList = () => {
  const { auth } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data } = useOrderCheckList(id);
  const orderData = data && [...data[0].order_number, ...data[0].order_store]
  return (
    <div className={styles['order-check-list-wrapper']}>
      <OrderCheckListTitle />
      <OrderCheckListContentList orderData={orderData} />
    </div>
  )
}

export default OrderCheckList