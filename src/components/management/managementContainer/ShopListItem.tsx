import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import styles from "./styles/ShopListItem.module.css";

interface propsType {
  managementTableData: Tables<'store_table'>;
  storeOrderData?: Tables<'order_store'>[]
}


const ShopListItem = ({ managementTableData, storeOrderData }: propsType) => {
  const [storeOrderInTable, setStoreOrderInTable] = useState<Tables<'order_store'>[]>([])
  
  useEffect(() => { 
    if (storeOrderData && managementTableData) {
      const data = storeOrderData?.filter((x) => x.table_id === managementTableData.id)
      setStoreOrderInTable([...data]) 
    }
  },[])
  return (
    <div className={styles['shop-list-item']} >
      <div className={styles['item-table']}>테이블 {managementTableData.position}</div>
      <div className={styles['item-order-number']}>
        <span> {storeOrderInTable?.[0]?.order_number &&`주문 번호 ${storeOrderInTable?.[0]?.order_number}`}</span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </div>
  )
}

export default ShopListItem