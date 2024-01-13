import useManagementCssStore from "@/shared/store/management-css"
import { Tables } from "@/types/supabase"
import Image from "next/image"
import { useEffect, useRef } from "react"
import styles from "./styles/OrderItem.module.css"


const OrderItem = ({ orderData }: { orderData: Tables<'order_store'> }) => {
  const { order_number, menu_list } = orderData;
  const menuList: Tables<'menu_item'>[] = JSON.parse(JSON.stringify(menu_list))
  const itemOrderListRef = useRef<HTMLUListElement>(null)
  const itemOrderListItemRef = useRef<HTMLLIElement[]>([])
  const itemOrderListItemImageRef = useRef<HTMLSpanElement[]>([])
  const itemOrderListItemNameRef = useRef<HTMLSpanElement[]>([])
  const itemOrderListItemPriceRef = useRef<HTMLSpanElement[]>([])
  const { refItemOrderList, refItemOrderListItem, refItemOrderListItemImage, refItemOrderListItemName, refItemOrderListItemPrice, isListClick, setClickMenuList, setIsListClick } = useManagementCssStore();

  const clickListStyleHandler = () => {
    setIsListClick(true)
    setIsListClick(!isListClick)
    setClickMenuList({
      itemOrderListRef,
      itemOrderListItemRef,
      itemOrderListItemImageRef,
      itemOrderListItemNameRef,
      itemOrderListItemPriceRef
    })
  }


  useEffect(() => {
    if (!refItemOrderList?.current) return
    refItemOrderList.current.style.setProperty('height', `${isListClick ? 'auto' : '0'}`)
    refItemOrderList.current.style.setProperty('margin-top', `${isListClick ? '10%' : '0'}`)
    if (refItemOrderListItemImage && refItemOrderListItemImage.current
      && refItemOrderListItemName && refItemOrderListItemName.current
      && refItemOrderListItemPrice && refItemOrderListItemPrice.current
    ) {
      for (let i = 0; i < refItemOrderListItemImage.current.length; i++) {
        refItemOrderListItem?.current?.[i].style?.setProperty('height', `${isListClick ? 'auto' : '0'}`)
        refItemOrderListItem?.current?.[i].style?.setProperty('padding', `${isListClick ? '5% 0' : '0'}`)
        refItemOrderListItemImage.current?.[i].style?.setProperty('visibility', `${isListClick ? 'visible' : 'hidden'}`)
        refItemOrderListItemName.current?.[i].style?.setProperty('visibility', `${isListClick ? 'visible' : 'hidden'}`)
        refItemOrderListItemPrice.current?.[i].style?.setProperty('visibility', `${isListClick ? 'visible' : 'hidden'}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListClick])





  return (
    <li className={styles['order-ilst-item']} onClick={clickListStyleHandler}>
      <div className={styles['item-order-number-box']}>
        <span className={styles['item-order-number']}>주문 번호 {order_number}</span>
        <span className={styles['item-arrow-icon']}></span>
      </div>
      <ul className={styles['item-order-list']} ref={itemOrderListRef}>
        {
          menuList?.map((item, index) => {
            return (
              <li key={item.id} className={styles['item-order-list-item']} ref={el => itemOrderListItemRef.current[index] = el as HTMLLIElement}>
                <span ref={el => itemOrderListItemImageRef.current[index] = el as HTMLSpanElement}><Image src={item.image_url ?? ''} alt="" width='30' height='30' /></span>
                <span ref={el => itemOrderListItemNameRef.current[index] = el as HTMLSpanElement}>{item.name}</span>
                <span ref={el => itemOrderListItemPriceRef.current[index] = el as HTMLSpanElement}>{item.price}</span>
              </li>
            )
          })
        }
      </ul>
    </li>
  )
}

export default OrderItem