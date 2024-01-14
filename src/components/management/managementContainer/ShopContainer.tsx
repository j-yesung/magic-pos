import { StoreWithOrderInfo, Tables } from "@/types/supabase";
import ShopListItem from "./ShopListItem";
import styles from "./styles/ShopContainer.module.css";


const ShopContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  const storeTable = managementData && managementData?.[0]?.store_table;// id
  const storeOrder = managementData && managementData?.[0]?.order_store;// table_id

  const storeTableSort = storeTable?.map((table) => {
    return storeOrder?.map((order) => { return order.table_id }).includes(table.id)
      ? { ...table, order_number: storeOrder?.filter((order) => { return order.table_id === table.id }).map((x) => x.order_number) }
      : { ...table, order_number: [-1] }
  }).sort((a, b) => (a.position && b.position && a.position > b.position ? -1 : 1))
    .sort((a, b) => (a.order_number[0] < b.order_number[0] ? 1 : -1))



  return (
    <div className={styles['shop-container']}>
      <div className={styles['shop-title']}>매장 주문</div>
      <ul className={styles['shop-list']}>
        {
          storeTableSort?.map((item: Tables<'store_table'>) => {
            return <ShopListItem key={item.id} storeOrderData={storeOrder} shopData={item} />
          })
        }
      </ul>
    </div>
  )
}

export default ShopContainer