import { Tables } from "@/types/supabase"
import styles from "./styles/PackagingListItem.module.css"

const PackagingListItem = ({ packagingData }: { packagingData: Tables<'order_number'> }) => {
  return (
    <li className={styles['packaging-list-item']}>
      <div className={styles['item-table']}>포장</div>
      <div className={styles['item-order-number']}>
        <span>주문 변호 { packagingData.order_number}</span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </li>
  )
}

export default PackagingListItem