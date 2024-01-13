import useManagementStore from "@/shared/store/management";
import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import styles from "./styles/ShopListItem.module.css";

interface propsType {
  shopData: Tables<'store_table'>;
  storeOrderData?: Tables<'order_store'>[]
}


const ShopListItem = ({ shopData, storeOrderData }: propsType) => {
  const [storeOrderInTable, setStoreOrderInTable] = useState<Tables<'order_store'>[]>([])
  const { setOrderId } = useManagementStore()

  const clickOrderDataReFetchHandler = () => {
    if (storeOrderInTable.length === 0) {
      alert('주문내역이 없습니다. ')
    } else {
      setOrderId({ id: storeOrderInTable[0].id, status: "테이블", number: `${shopData.position}` })
    }
  }
  useEffect(() => {
    if (storeOrderData && shopData) {
      const data = storeOrderData?.filter((x) => x.table_id === shopData.id)
      setStoreOrderInTable([...data])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles['shop-list-item']} onClick={clickOrderDataReFetchHandler}>
      <div className={styles['item-table']}>테이블 {shopData.position}</div>
      <div className={styles['item-order-number']}>
        <span> {storeOrderInTable?.[0]?.order_number && `주문 번호 ${storeOrderInTable?.[0]?.order_number}`}</span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </div>
  )
}

export default ShopListItem