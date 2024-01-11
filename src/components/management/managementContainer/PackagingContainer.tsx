import PackagingListItem from "./PackagingListItem"
import styles from "./styles/PackagingContainer.module.css"


const PackagingContainer = () => {
  return (
    <div className={styles['packaging-container']}>
      <div className={styles['packaging-title']}>포장 주문</div>
      <ul className={styles['packaging-list']}>
        <PackagingListItem />
      </ul>
    </div>
  )
}

export default PackagingContainer