import OrderCheckListContentList from './OrderCheckListContentList';
import OrderCheckListFilterButtonBox from './OrderCheckListFilterButtonBox';
import OrderCheckListTitle from './OrderCheckListTitle';
import styles from './styles/OrderCheckList.module.css';

const OrderCheckList = () => {
  return (
    <div className={styles['order-check-list-wrapper']}>
      <OrderCheckListFilterButtonBox />
      <OrderCheckListTitle />
      <OrderCheckListContentList />
    </div>
  );
};

export default OrderCheckList;
