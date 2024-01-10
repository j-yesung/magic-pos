import useTableStore from "@/shared/store/table";
import SideBarButtonBox from "./SideBarButtonBox";
import SideBarContainer from "./SideBarContainer";
import styles from "./styles/TableSideBar.module.css";

const TableSideBar = () => {
  const { tableNumber } = useTableStore();
  return (
    <div className={styles['sideBarWrapper']}>
      <div className={styles['sideBarTitle']}>테이블 {tableNumber}</div>
      <SideBarContainer />
      <SideBarButtonBox />
    </div >
  )
}

export default TableSideBar