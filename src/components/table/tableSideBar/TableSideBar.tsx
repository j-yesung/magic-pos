import SideBarButtonBox from "./SideBarButtonBox"
import SideBarContainer from "./SideBarContainer"
import styles from "./styles/TableSideBar.module.css"

const TableSideBar = () => {
  return (
    <div className={styles['sideBarWrapper']}>
      <div className={styles['sideBarTitle']}>테이블 1</div>
      <SideBarContainer />
      <SideBarButtonBox />
    </div >
  )
}

export default TableSideBar