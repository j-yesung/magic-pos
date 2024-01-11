import { StoreWithStoreTable, Tables } from "@/types/supabase"
import ShopListItem from "./ShopListItem"
import styles from "./styles/ShopContainer.module.css"


const ShopContainer = ({ managementData }: { managementData?: StoreWithStoreTable }) => {
  
  return (
    <div className={styles['shop-container']}>
      <div className={styles['shop-title']}>매장 주문</div>
      <ul className={styles['shop-list']}>
        {
          managementData?.[0]?.store_table.sort((a, b) => {
            if (a.position && b.position) {
              return a.position < b.position ? -1 : 1
            }
            return 0
          }).map((item: Tables<'store_table'>) => {
            return <ShopListItem key={item.id} managementTableData={item} />
          })
        }
      </ul>
    </div>
  )
}

export default ShopContainer