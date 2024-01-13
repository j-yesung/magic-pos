import useManagementStore from "@/shared/store/management";
import useManagementCssStore from "@/shared/store/management-css";
import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import styles from "./styles/ShopListItem.module.css";

interface propsType {
  shopData: Tables<'store_table'>;
  storeOrderData?: Tables<'order_store'>[]
}


const ShopListItem = ({ shopData, storeOrderData }: propsType) => {
  const [storeOrderInTable, setStoreOrderInTable] = useState<Tables<'order_store'>[]>([])
  const [storeOrderInTableById, setStoreOrderInTableById] = useState<string[]>([])
  const { setOrderId } = useManagementStore()
  const { setIsListClick } = useManagementCssStore();

  const clickOrderDataReFetchHandler = () => {
    if (storeOrderInTable.length === 0) {
      alert('주문내역이 없습니다. ')
    } else {
      setOrderId({ id: storeOrderInTableById, status: "테이블", number: `${shopData.position}` })
      setIsListClick(true)
    }
  }
  console.log(storeOrderInTableById)
  useEffect(() => {
    if (storeOrderData && shopData) {
      const data = storeOrderData?.filter((x) => x.table_id === shopData.id)
      const idData = []
      for (let i = 0; i < data.length; i++) {
        idData.push(data[i].id)
      }
      setStoreOrderInTableById([...idData])
      setStoreOrderInTable([...data])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className={styles['shop-list-item']} onClick={clickOrderDataReFetchHandler}>
      <div className={styles['item-table']}>테이블 {shopData.position}</div>
      <div className={styles['item-order-number']}>
        <span>주문 번호 {
          storeOrderInTable?.map((item) => {
            return <span key={item.id}>{item.order_number}<span>, </span></span>
          })
        }</span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </div>
  )
}

export default ShopListItem