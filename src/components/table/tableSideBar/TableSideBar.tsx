import useTableStore from "@/shared/store/table";
import { useEffect, useRef } from "react";
import SideBarButtonBox from "./SideBarButtonBox";
import SideBarContainer from "./SideBarContainer";
import styles from "./styles/TableSideBar.module.css";

const TableSideBar = () => {
  const { tableNumber, refSideBar, refDummySideBar, refSideBarBg, setSideBarRef, setSideBarBgRef } = useTableStore();
  const sideBarRef = useRef<HTMLDivElement>(null)
  const sideBarBgRef = useRef<HTMLDivElement>(null)

  const clickCloseSideBarHandler = () => {
    refSideBar?.current?.style.setProperty('right', '-18%')
    refDummySideBar?.current?.style.setProperty('width', '0%')
    refSideBarBg?.current?.style.setProperty('visibility', 'hidden')
    refSideBarBg?.current?.style.setProperty('opacity', '0%')
  }

  useEffect(() => {
    setSideBarRef(sideBarRef)
    setSideBarBgRef(sideBarBgRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles['sideBarBackground']} ref={sideBarBgRef} onClick={clickCloseSideBarHandler}></div>
      <div className={styles['sideBarWrapper']} ref={sideBarRef}>
        <div className={styles['sideBarTitle']}>테이블 {tableNumber}</div>
        <SideBarContainer />
        <SideBarButtonBox />
      </div>
    </>
  )
}

export default TableSideBar