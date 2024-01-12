import { StoreWithOrderInfo } from "@/types/supabase"
import PackagingListItem from "./PackagingListItem"
import styles from "./styles/PackagingContainer.module.css"


const PackagingContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  return (
    <div className={styles['packaging-container']}>
      <div className={styles['packaging-title']}>포장 주문</div>
      <ul className={styles['packaging-list']}>
        {
          managementData?.[0]?.order_number.sort((a, b) => {
            if (a.order_time && b.order_time) {
              return a.order_time > b.order_time ? -1 : 1
            }
            return 0
          }).map((item) => { 
            return (
              <PackagingListItem key={item.id} packagingData={item} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default PackagingContainer