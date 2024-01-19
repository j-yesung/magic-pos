import { Tables } from "@/types/supabase";
import OrderCheckListItem from "./OrderCheckListItem";
import styles from './styles/OrderCheckListContentList.module.css';

const orderCheckListContentList = ({ orderData }: { orderData: Tables<'order_store'>[] | Tables<'order_number'>[] }) => {
  return (
    <div className={styles['order-check-list-content-list']}>
      {
        orderData?.sort((a, b) => a.is_done && !b.is_done || a.order_time < b.order_time ? 1 : -1)
          .map((item) => <OrderCheckListItem key={item.id} orderData={item} />)
      }
    </div>
  )
}

export default orderCheckListContentList