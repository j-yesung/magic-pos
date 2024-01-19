import OrderCheckListContentList from './OrderCheckListContentList';
import OrderCheckListTitle from './OrderCheckListTitle';
import styles from './styles/OrderCheckList.module.css';


const OrderCheckList = () => {

  return (
    <div className={styles['order-check-list-wrapper']}>
      <OrderCheckListTitle />
      <OrderCheckListContentList />
    </div>
  )
}

export default OrderCheckList