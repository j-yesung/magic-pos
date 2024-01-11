import ManagementContainer from "./managementContainer/ManagementContainer"
import ManagementSideBar from "./managementSideBar/ManagementSideBar"
import styles from "./styles/Management.module.css"

const Management = () => {
  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer />
      <ManagementSideBar />
    </div>
  )
}

export default Management