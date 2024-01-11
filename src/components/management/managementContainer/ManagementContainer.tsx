import PackagingContainer from "./PackagingContainer"
import ShopContainer from "./ShopContainer"
import styles from "./styles/ManagementContainer.module.css"

const ManagementContainer = () => {
  return (
    <div className={styles['managementContainer']}>
      <ShopContainer />
      <PackagingContainer />
    </div>
  )
}

export default ManagementContainer