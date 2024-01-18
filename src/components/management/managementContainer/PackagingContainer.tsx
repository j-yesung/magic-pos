import { StoreWithOrderInfo } from "@/types/supabase";
import PackagingListItem from "./PackagingListItem";
import styles from "./styles/PackagingContainer.module.css";


const PackagingContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  return (
    <div className={styles['packaging-container']}>
      {
        managementData?.[0]?.order_number.filter((item) => item.is_togo === true)
          .sort((a, b) => {
            if (a.order_time && b.order_time) {
              return a.order_time < b.order_time ? -1 : 1
            }
            return 0
          }).map((item) => {
            return (
              <PackagingListItem key={item.id} packagingData={item} />
            )
          })
      }
    </div>
  )
}

export default PackagingContainer



