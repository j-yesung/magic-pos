import { Tables } from "@/types/supabase"
import styles from "./styles/ShopListItem.module.css"

const ShopListItem = ({ managementTableData }: {managementTableData: Tables<'store_table'>}) => {
  return (
    <div className={styles['shop-list-item']} >
      <div className={styles['item-table']}>테이블 {managementTableData.position}</div>
      <div className={styles['item-order-number']}>
        <span>주문 변호 123445454545</span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </div>
  )
}

export default ShopListItem