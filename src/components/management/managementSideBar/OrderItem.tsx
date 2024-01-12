import useManagementCssStore from "@/shared/store/management-css"
import { useEffect, useRef, useState } from "react"
import styles from "./styles/OrderItem.module.css"
const OrderItem = () => {
  const [isListClick, setIsListClick] = useState(false)
  const itemOrderListRef = useRef<HTMLUListElement>(null)
  const itemOrderListItemRef = useRef<HTMLLIElement[]>([])
  const itemOrderListItemSpanRef = useRef<HTMLSpanElement[]>([])
  const { refItemOrderList, refItemOrderListItem, refItemOrderListItemSpan, setClickMenuList } = useManagementCssStore();
  
  const clickListStyleHandler = () => { 
    setIsListClick(!isListClick)
      setClickMenuList({
        itemOrderListRef,
        itemOrderListItemRef,
        itemOrderListItemSpanRef
      })
  }
  
  
  useEffect(() => {
    if (!refItemOrderList?.current) return
    refItemOrderList.current.style.setProperty('height', `${isListClick ? 'auto' : '0'}`)
    refItemOrderList.current.style.setProperty('margin-top', `${isListClick ? '10%' : '0'}`)
    if(refItemOrderListItemSpan && refItemOrderListItemSpan.current ){
      for (let i = 0; i < refItemOrderListItemSpan.current.length; i++) {
        refItemOrderListItem?.current?.[i].style?.setProperty('height', `${isListClick ? 'auto' : '0'}`)
        refItemOrderListItem?.current?.[i].style?.setProperty('padding', `${isListClick ? '5% 0' : '0'}`)
        refItemOrderListItemSpan.current?.[i].style?.setProperty('visibility', `${isListClick ? 'visible' : 'hidden'}`)
      }
    }
  },[isListClick])
  




  return (
    <li  className={styles['order-ilst-item']} onClick={clickListStyleHandler}>
      <div className={styles['item-order-number-box']}>
        <span className={styles['item-order-number']}>주문 변호 546546453453454654</span>
        <span className={styles['item-arrow-icon']}></span>
      </div>
      <ul className={styles['item-order-list']} ref={itemOrderListRef}>
        {
          [1, 2, 3, 4, 5, 6, 7].map((x,i) => { 
            return (
            <li key={x} className={styles['item-order-list-item']} ref={el => itemOrderListItemRef.current[i] = el as HTMLLIElement}>
              <span ref={el=> itemOrderListItemSpanRef.current[i] = el as HTMLSpanElement}>{x}</span>
            </li>
            )
          })
        }
      </ul>
    </li>
  )
}

export default OrderItem