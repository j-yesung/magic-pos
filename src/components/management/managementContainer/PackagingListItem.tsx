import styles from "./styles/PackagingListItem.module.css"

const PackagingListItem = () => {
  return (
    <li className={styles['packaging-list-item']}>
      <div className={styles['item-table']}>포장</div>
      <div className={styles['item-order-number']}>
        <span>주문 변호 123445454545</span>
      </div>
      <div className={styles['item-status']}>매뉴 준비중</div>
    </li>
  )
}

export default PackagingListItem