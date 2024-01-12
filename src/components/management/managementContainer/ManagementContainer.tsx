import { StoreWithStoreTable } from "@/types/supabase"
import PackagingContainer from "./PackagingContainer"
import ShopContainer from "./ShopContainer"
import styles from "./styles/ManagementContainer.module.css"

const ManagementContainer = ({ managementData }: {managementData?: StoreWithStoreTable[]}) => {
  return (
    <div className={styles['managementContainer']}>
      <ShopContainer managementData={managementData} />
      <div className={styles['boundary-line']}></div>
      <PackagingContainer />
    </div>
  )
}

export default ManagementContainer