import OrderItem from "./OrderItem"
import styles from "./styles/SideBarContainer.module.css"

const SideBarContainer = () => {
  return (
    <div className={styles['sideBar-container']}>
      <ul className={styles['order_list']}>
        <OrderItem />
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </ul>
      
    </div>
  )
}

export default SideBarContainer